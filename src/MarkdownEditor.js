import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleChange = async (event) => {
    setMarkdown(event.target.value);
    try {
      const response = await fetch(
        `http://localhost:3001/convert?markdown=${encodeURIComponent(
          event.target.value
        )}`
      );
      const html = await response.text();
      setHtml(html);
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };

  return (
    <div className="App">
      <textarea
        value={markdown}
        onChange={handleChange}
        placeholder="Type your Markdown here..."
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {markdown}
      </SyntaxHighlighter>
    </div>
  );
}

export default MarkdownEditor;
