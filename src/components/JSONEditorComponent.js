import React, { useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const JSONEditorComponent = ({ data, setData }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      mode: "tree",
      onChange: () => {
        try {
          // Retrieve updated JSON and set it to the state
          const updatedData = editorRef.current.get();
          setData(updatedData);
        } catch (error) {
          console.error("Invalid JSON", error);
        }
      },
    };
    
    // Initialize editor
    editorRef.current = new JSONEditor(containerRef.current, options);
    editorRef.current.set(data); // Initialize with the provided data

    // Clean up editor on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [setData]);

  // Update editor whenever data changes outside the editor
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.update(data);
    }
  }, [data]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default JSONEditorComponent;
