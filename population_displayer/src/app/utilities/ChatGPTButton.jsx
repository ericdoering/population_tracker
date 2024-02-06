"use client";

import React, { useState } from "react";
import { API_KEY } from "../../app/constants/api_consts";
import { Loader } from "../components/Loader";
import { AnalyticsText } from "../components/AnalyticsText";

const apiKey = API_KEY;

export const ChatGPTButton = ({ city }) => {
  const [fact, setFacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function callOpenAIAPI() {
    // console.log("Calling the OpenAI API");
    setIsLoading(true)

    // const APIBody = {
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: `Give 3 brief bullet points on the population trends of ${city}
    //       do not give specific dates and numbers`,
    //     },
    //   ],
    //   temperature: 0,
    //   max_tokens: 100,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // };

    // await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + apiKey,
    //   },
    //   body: JSON.stringify(APIBody),
    // })
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     setFacts(data.choices[0].message.content.trim());
    //     setIsLoading(false)

    //   });
    function timeout() {
      setTimeout(() => {
        console.log("Delayed for 3 seconds.");
    
        // Inside the setTimeout callback
        setFacts(`-This city has seen a massive influx of people since the turn of the century, -particularly in 1915 where world events were causing mass migration. -This city's population increase can be attributed to new industy and immigration, The paper boom caused a massive need for workers and office staff. Many TV and media outlets have romantisized the city and made it a hub for new transplants, particularly 'New To Town'.`);
        setIsLoading(false);
      }, 1000);  // Adjust the delay time as needed
    }
    
    // Call the timeout function
    timeout();
  }
  console.log(fact);
  return (
      <>
        <div className="fixed top-20 right-20 transform -translate-x-1/2 text-center">
              <div>
                  <button className="bg-red-800 block hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black" onClick={callOpenAIAPI}>
                    Analytics
                  </button>
                  {fact !== "" ? (
                  <AnalyticsText fact={fact} />
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
