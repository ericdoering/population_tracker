"use client";

export function AnalyticsText({ fact }) {
    return (
      <>
        <div className="word-by-word text-container">
          {fact.split(".").map((sentence, index) => (
            <div key={index}>
              {sentence.trim() !== "" ? (
                <>
                  {sentence.endsWith('.') ? <p className="word">{sentence}&nbsp;</p> : <p className="word">{sentence}&nbsp;<br /><br /></p>}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </>
    );
  };
  