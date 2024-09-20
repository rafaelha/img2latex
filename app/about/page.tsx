import React from 'react';

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-light mb-6 text-gray-800">About</h1>
        <p className="text-xl text-gray-600 mb-4">
          Made with ❤️ by Rafael Haenel
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Vancouver, BC
        </p>
        <div className="w-16 h-1 bg-gray-300 mx-auto mb-8"></div>
        <p className="text-sm text-gray-400 italic">
          Transforming equations into code, one image at a time.
        </p>
      </div>
    </div>
  );
}