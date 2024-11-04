import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import Header from './components/Header';
import ToolInterface from './components/ToolInterface';
import DebugWindow from './components/DebugWindow';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [debugMessages, setDebugMessages] = useState<string[]>([]);

  const addDebugMessage = (message: string) => {
    setDebugMessages(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2900')] 
          bg-cover bg-center opacity-5 blur-sm"></div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-8">
            <Shield className="w-6 h-6 text-indigo-600 mr-2" />
            <span className="text-indigo-700 font-medium">Secure & Private</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Invisible Message Protection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hide your sensitive messages within innocent-looking media files using 
            military-grade encryption and advanced steganography techniques.
          </p>
        </div>
      </section>

      {/* Main Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ToolInterface onDebugMessage={addDebugMessage} />
      </section>

      {/* Debug Window */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebugWindow messages={debugMessages} />
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Features />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;