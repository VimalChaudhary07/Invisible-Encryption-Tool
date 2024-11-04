import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DebugWindowProps {
  messages: string[];
}

export default function DebugWindow({ messages }: DebugWindowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg text-gray-100 overflow-hidden">
      <div
        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-mono">Debug Console</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4 font-mono text-sm max-h-48 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="py-1">
              {message}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-gray-500">No messages yet...</div>
          )}
        </div>
      )}
    </div>
  );
}