import CryptoJS from 'crypto-js';

// Constants for better performance
const HEADER_SIZE = 32;
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
const MAGIC_NUMBER = 'STEG'; // Signature to verify valid steganography files

export async function hideMessage(file: File, message: string, password?: string): Promise<Blob> {
  try {
    // Encrypt message if password is provided
    const messageToHide = password 
      ? CryptoJS.AES.encrypt(message, password).toString()
      : message;
    
    // Convert message to binary
    const binaryMessage = stringToBinary(messageToHide);
    
    // Calculate required size including magic number
    const requiredSize = HEADER_SIZE + MAGIC_NUMBER.length + binaryMessage.length;
    
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength * 8 < requiredSize) { // Check bits available
      throw new Error('File is too small to hide this message');
    }
    
    // Create a copy of the file data
    const modifiedArray = new Uint8Array(arrayBuffer);
    
    // Add magic number
    const magicBytes = new TextEncoder().encode(MAGIC_NUMBER);
    for (let i = 0; i < magicBytes.length; i++) {
      modifiedArray[i] = magicBytes[i];
    }
    
    // Store message length after magic number
    const lengthBytes = new Uint32Array([binaryMessage.length]);
    const lengthArray = new Uint8Array(lengthBytes.buffer);
    for (let i = 0; i < 4; i++) {
      modifiedArray[magicBytes.length + i] = lengthArray[i];
    }
    
    // Hide message data in least significant bits
    const startOffset = magicBytes.length + 4;
    for (let i = 0; i < binaryMessage.length; i++) {
      const byteIndex = startOffset + Math.floor(i / 8);
      const bitIndex = i % 8;
      const bit = parseInt(binaryMessage[i]);
      
      modifiedArray[byteIndex] = (modifiedArray[byteIndex] & ~(1 << bitIndex)) | (bit << bitIndex);
    }
    
    return new Blob([modifiedArray], { type: file.type });
  } catch (error) {
    throw new Error(`Encryption failed: ${(error as Error).message}`);
  }
}

export async function extractMessage(file: File, password?: string): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const dataView = new Uint8Array(arrayBuffer);
    
    // Verify magic number
    const magicNumber = new TextDecoder().decode(dataView.slice(0, MAGIC_NUMBER.length));
    if (magicNumber !== MAGIC_NUMBER) {
      throw new Error('Invalid file format or no hidden message found');
    }
    
    // Read message length
    const lengthBytes = dataView.slice(MAGIC_NUMBER.length, MAGIC_NUMBER.length + 4);
    const messageLength = new Uint32Array(lengthBytes.buffer)[0];
    
    // Extract binary message
    let binaryMessage = '';
    const startOffset = MAGIC_NUMBER.length + 4;
    
    for (let i = 0; i < messageLength; i++) {
      const byteIndex = startOffset + Math.floor(i / 8);
      const bitIndex = i % 8;
      const bit = (dataView[byteIndex] >> bitIndex) & 1;
      binaryMessage += bit;
    }
    
    // Convert binary to string
    const extractedMessage = binaryToString(binaryMessage);
    
    // Decrypt if password provided
    if (password) {
      try {
        const decrypted = CryptoJS.AES.decrypt(extractedMessage, password);
        const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedMessage) {
          throw new Error('Invalid password');
        }
        return decryptedMessage;
      } catch (error) {
        throw new Error('Invalid password or corrupted message');
      }
    }
    
    return extractedMessage;
  } catch (error) {
    throw new Error(`Decryption failed: ${(error as Error).message}`);
  }
}

function stringToBinary(str: string): string {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);
  return Array.from(uint8Array)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');
}

function binaryToString(binary: string): string {
  const bytes = binary.match(/.{8}/g) || [];
  const uint8Array = new Uint8Array(bytes.map(byte => parseInt(byte, 2)));
  return new TextDecoder().decode(uint8Array);
}