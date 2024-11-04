import React from 'react';
import { Shield, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-semibold">Invisible Encryption</span>
        </div>
        
        <button
          onClick={() => window.open('https://github.com/sponsors/your-username')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support Us
        </button>
      </nav>
    </header>
  );
}