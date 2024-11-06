import React, { useState } from "react";
import JSONEditorComponent from "./JSONEditorComponent";
import DiagramComponent from "./DiagramComponent";
import JSONInputComponent from "./JSONInputComponent";
import jsonlint from "jsonlint-mod";

const Home = () => {
  const [data, setData] = useState({});
  const [jsonText, setJsonText] = useState("");
  const [errorPosition, setErrorPosition] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Handler for loading JSON with error handling
  const handleLoadJson = () => {
    try {
      const parsedData = jsonlint.parse(jsonText);
      setData(parsedData);
      setErrorPosition(null);
    } catch (error) {
      const errorMessage = error.message || "Invalid JSON format";
      const match = errorMessage.match(/line (\d+)/);
      const lineNumber = match ? parseInt(match[1], 10) - 1 : null;
      setErrorPosition(lineNumber);
    }
  };

  // Toggle full screen mode for DiagramComponent
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={isFullScreen ? "full-screen-container" : "main-container"}>
      {!isFullScreen && (
        <>
          <div className="input-container">
            <h3>JSON Input</h3>
            <JSONInputComponent
              jsonText={jsonText}
              setJsonText={setJsonText}
              errorPosition={errorPosition}
            />
            <button onClick={handleLoadJson} className="load-button">
              Load JSON
            </button>
          </div>
          <div className="editor-container">
            <h3>JSON Editor</h3>
            <JSONEditorComponent data={data} setData={setData} />
          </div>
        </>
      )}
      <div className={isFullScreen ? "full-screen-diagram-container" : "diagram-container"}>
        <div className="diagram-header">
          <h3>Diagram</h3>
          <button onClick={toggleFullScreen} className="full-screen-button">
            {isFullScreen ? "Exit Full Screen" : "View Full Screen"}
          </button>
        </div>
        <DiagramComponent data={data} isFullScreen={isFullScreen} />
      </div>
    </div>
  );
};

export default Home;
