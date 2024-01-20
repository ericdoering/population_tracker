"use client";

import { useState } from 'react';
import { API_KEY } from  "../../app/constants/api_variables"

const apiKey = API_KEY


const systemMessage = {
  "role": "system",
  "content": "Explain things like an economist."
};

export function ChatGPTButton({ city }) {
  const [messages, setMessages] = useState([]);

  const handleButtonClick = async() => {
    const userMessage = `Give details about ${city}  population trends.`;
    const newMessage = { message: userMessage, sender: "user" };

    setMessages([...messages, newMessage]);
    await processMessageToChatGPT([...messages, newMessage]);
  };


  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      console.log("RESPONSE!!!!", response)

      const data = await response.json();

      if(data){
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      }
      else {
        message: setMessages(["San Franscisco Data unable to be synthesized..."])
      }
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
  };
};

  return (
    <div>
      <button
        className="bg-blue-900 block ml-auto mt-20 mr-6 mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
        onClick={handleButtonClick}
      >
        Analytics
      </button>
          <div className="block ml-auto mt-20 mr-6 mb-8">
            <div>
              {messages.map((message, index) => (
                    <p key={index}>{message.message}</p>
              ))}
            </div>
          </div>
      </div>
  );
}
