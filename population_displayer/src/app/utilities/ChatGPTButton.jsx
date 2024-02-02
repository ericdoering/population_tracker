"use client";

import React, { useState } from "react";
import { API_KEY } from "../../app/constants/api_consts";
import { Loader } from "../components/Loader";

const apiKey = API_KEY;

export const ChatGPTButton = ({ city }) => {
  const [fact, setFacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    setIsLoading(true)

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give 3 brief bullet points on the population trends of ${city}
          do not give specific dates and numbers`,
        },
      ],
      temperature: 0,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setFacts(data.choices[0].message.content.trim());
        setIsLoading(false)
      });
  }

  console.log(fact);
  return (
    <>
      <div>
  <div className="flex flex-col items-end">
    <button className="bg-blue-900 block mb-2 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black" onClick={callOpenAIAPI}>
      Analytics
    </button>
    {fact !== "" ? (
      <div className="word-by-word">
        {fact.split(' ').map((word, index) => (
         <span key={index} className="word" style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s' }}>{word}&nbsp;</span>
        ))}
      </div>
    ) : null}
  </div>
  <div>
    {isLoading ? 
      <Loader /> : null
    }
  </div>
</div>
    </>
  );
};
