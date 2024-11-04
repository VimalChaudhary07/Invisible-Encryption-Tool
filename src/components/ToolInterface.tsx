import React, { useState } from 'react';
import { Upload, Lock, Unlock, Download } from 'lucide-react';
import { hideMessage, extractMessage } from '../utils/steganography';

interface ToolInterfaceProps {
  onDebugMessage: (message: string) => void;
}

export default function ToolInterface({ onDebugMessage }: ToolInterfaceProps) {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
      onDebugMessage(`File selected: ${selectedFile.name}`);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (mode === 'encrypt' && !message.trim()) {
      setError('Please enter a message to hide');
      return;
    }

    setError('');
    setIsProcessing(true);
    onDebugMessage(`Starting ${mode} process...`);
    
    try {
      if (mode === 'encrypt') {
        const processedBlob = await hideMessage(file, message, password || undefined);
        setProcessedFile(processedBlob);
        onDebugMessage('Message successfully hidden in file');
      } else {
        const extractedMessage = await extractMessage(file, password || undefined);
        setMessage(extractedMessage);
        onDebugMessage('Hidden message successfully extracted');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      onDebugMessage('Error during processing: ' + errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected-${file?.name || 'file'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onDebugMessage('File downloaded successfully');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Mode Toggle */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => {
            setMode('encrypt');
            setMessage('');
            setProcessedFile(null);
            setError('');
          }}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            mode === 'encrypt'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Lock className="w-4 h-4 mr-2" />
          Encrypt
        </button>
        <button
          onClick={() => {
            setMode('decrypt');
            setMessage('');
            setProcessedFile(null);
            setError('');
          }}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            mode === 'decrypt'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Unlock className="w-4 h-4 mr-2" />
          Decrypt
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select File
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/*,audio/*,video/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, MP3, or MP4 up to 10MB
            </p>
          </div>
        </div>
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encrypt' ? 'Message to Hide' : 'Extracted Message'}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={mode === 'encrypt' ? 'Enter your secret message' : 'Extracted message will appear here'}
          readOnly={mode === 'decrypt'}
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password (Optional)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter password for additional security"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleProcess}
          disabled={!file || isProcessing}
          className={`flex items-center px-6 py-2 rounded-lg ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white transition-colors`}
        >
          {isProcessing ? (
            'Processing...'
          ) : mode === 'encrypt' ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Hide Message
            </>
          ) : (
            <>
              <Unlock className="w-4 h-4 mr-2" />
              Extract Message
            </>
          )}
        </button>
        {mode === 'encrypt' && processedFile && (
          <button
            onClick={downloadFile}
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        )}
      </div>
    </div>
  );
}