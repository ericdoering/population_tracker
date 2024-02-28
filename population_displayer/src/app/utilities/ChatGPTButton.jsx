import React, { useState } from "react";
import { Loader } from "../components/Loader";
import { AnalyticsText } from "../components/AnalyticsText";
// import { apiKey } from "../constants/api_consts";
 
export const ChatGPTButton = ({ city }) => {
  const [fact, setFacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [factsOnPage, setFactsOnPage] = useState(false);


  async function callOpenAIAPI() {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

    if(!factsOnPage){
    setIsLoading(true)

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give 3 brief sentences on the population/cultural 
          trends of ${city}. Make them brief yet specific. 
          Don't add an actual bullet point or number to the beginning of the sentence 
          and make sure each sentence ends with only a period "."
          do not give specific dates and numbers`,
        },
      ],
      temperature: 0,
      max_tokens: 150,
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
        setFactsOnPage(true)
      });
  }
}
  
  return (
    <>
    <div className="text-center">
      <div className="fixed top-20 right-20 transform -translate-x-1/2 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4"> 
            <button className="bg-red-800 block hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black" onClick={callOpenAIAPI}>
              AI Analytics
            </button>
            {fact !== "" && (
            <div className="mb-2">
              <AnalyticsText fact={fact} />
            </div>
            )}
          </div>
        <div>
        {isLoading && !factsOnPage ? 
          <Loader /> : null
        }
        </div>
        </div>
      </div>
    </div>
  </>
  );
};
