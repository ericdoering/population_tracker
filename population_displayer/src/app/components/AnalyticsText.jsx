"use client";

export function AnalyticsText({ fact }) {
  return (
    <>
      <div className="word-by-word text-container mt-4 text-center">
        {fact !== "" ? (
          <div>
            {fact.split('.').map((sentence, index) => (
              <div key={index}>
                {sentence.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="word" style={{ animationDelay: `${index * 0.1 + wordIndex * 0.1}s`, animationDuration: '0.5s' }}>
                    {word}
                    &nbsp;
                  </span>
                ))}
                <br />
                <br /> 
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};