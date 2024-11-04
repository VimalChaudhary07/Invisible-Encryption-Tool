import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Shield, FileQuestion, Server, File, Gift } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  icon: React.ElementType;
}

function FAQItem({ question, answer, icon: Icon }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200 
          ${isOpen ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${isOpen ? 'text-indigo-600' : 'text-gray-400'}`} />
          <span className="text-lg font-semibold text-gray-900">{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqs: FAQItemProps[] = [
    {
      icon: FileQuestion,
      question: "What is steganography?",
      answer: "Steganography is the art of hiding secret information within ordinary files. Think of it like invisible ink for the digital age - we can hide encrypted messages within images, audio, or video files without anyone knowing they're there. This makes it perfect for secure communication, as the files appear completely normal to others."
    },
    {
      icon: Lock,
      question: "How secure is the encryption?",
      answer: "We implement military-grade AES-256 encryption, the same standard used by governments and financial institutions. When combined with a strong password, it would take millions of years for even the most powerful computers to crack. Your messages are safe with us."
    },
    {
      icon: File,
      question: "What file types can I use?",
      answer: "Currently, we support multiple media formats including PNG and JPG images, MP3 audio files, and MP4 video files up to 10MB in size. Each format has been carefully chosen to ensure optimal balance between security and file quality."
    },
    {
      icon: Shield,
      question: "Is my data protected?",
      answer: "Absolutely! We take privacy seriously. All encryption and decryption happens right in your browser - your files and messages never leave your device. We don't store any data on our servers, so there's nothing to hack or leak."
    },
    {
      icon: Server,
      question: "How do I decrypt a message?",
      answer: "Decrypting is simple: Switch to 'Decrypt' mode, upload the file containing the hidden message, enter the password that was used to encrypt it, and click 'Extract Message'. The hidden message will appear in the text area below."
    },
    {
      icon: Gift,
      question: "Why is this tool free?",
      answer: "We believe privacy should be accessible to everyone. This tool is supported by donations from users who share our vision of a more private and secure internet. While we welcome support, the tool will always remain free and open source."
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50 to-white opacity-50"></div>
      <div className="relative">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to know about our encryption tool. Can't find your answer? 
          <a href="#contact" className="text-indigo-600 hover:text-indigo-700 ml-1">
            Contact us
          </a>
        </p>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
}