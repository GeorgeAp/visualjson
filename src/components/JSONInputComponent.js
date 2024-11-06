import React, { useState, useRef, useEffect } from "react";
import jsonlint from "jsonlint-mod";
import "./JSONInputComponent.css"; // Import the CSS file for this component

const JSONInputComponent = ({ jsonText, setJsonText, errorPosition }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setJsonText(e.target.value);
  };

  // Dynamically add line numbers based on text content
  const getLineNumbers = () => {
    const lines = jsonText.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  // Adjusts the textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height based on content
    }
  }, [jsonText]);

  return (
    <div className="json-input-container">
      <div className="line-number-container">
        <pre className="line-numbers">{getLineNumbers()}</pre>
      </div>
      <textarea
        ref={textareaRef}
        value={jsonText}
        onChange={handleChange}
        placeholder="Paste your JSON here..."
        className={`json-textarea ${errorPosition !== null ? "error" : ""}`}
        rows="5"
      />
      {errorPosition !== null && (
        <div className="error-text">Error at line {errorPosition + 1}</div>
      )}
    </div>
  );
};

export default JSONInputComponent;
