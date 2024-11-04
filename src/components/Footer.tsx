import React from 'react';
import { Github, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-indigo-400" />
              <span className="text-lg font-semibold">Invisible Encryption</span>
            </div>
            <p className="mt-4 text-sm">
              Secure, private, and free steganography tool for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/VimalChaudhary07" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="mailto:vimalchaudhary011@gmail.com" 
                className="hover:text-white"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {new Date().getFullYear()} Invisible Encryption. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}