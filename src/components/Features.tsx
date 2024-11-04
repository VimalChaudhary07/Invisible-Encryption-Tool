import React from 'react';
import { Shield, Lock, Cpu, Eye } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Encryption',
      description: 'Military-grade encryption ensures your messages remain private and secure.',
    },
    {
      icon: Eye,
      title: 'Steganography',
      description: 'Advanced techniques to hide data within media files without visible changes.',
    },
    {
      icon: Cpu,
      title: 'Client-Side Processing',
      description: 'All operations happen in your browser. No data is ever sent to our servers.',
    },
    {
      icon: Lock,
      title: 'Password Protection',
      description: 'Optional password protection adds an extra layer of security.',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto h-12 w-12 text-indigo-600">
              <feature.icon className="w-full h-full" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}