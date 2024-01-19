"use client";

import React, { useState } from 'react';

export const ChatGPTButton = () => {
  const [facts, setFacts] = useState('');

  const getSanFranciscoFacts = async () => {
    try {
      // Make an API call to the ChatGPT API
      const response = await fetch('https://api.chatgpt.com/getSanFranciscoFacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers, authentication tokens, etc.
        },
        // You may pass additional parameters like context or messages to ChatGPT
        body: JSON.stringify({
          prompt: 'Tell me quick facts about San Francisco',
        }),
      });

      const data = await response.json();
      // Set the facts in the state to be displayed in the UI
      setFacts(data.facts);
    } catch (error) {
      console.error('Error fetching San Francisco facts:', error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
        onClick={getSanFranciscoFacts}
      >
        San Francisco, CA
      </button>

      {facts && (
        <div className="text-gray-800">
          <h2>Quick Facts about San Francisco:</h2>
          <p>{facts}</p>
        </div>
      )}
    </div>
  );
};

