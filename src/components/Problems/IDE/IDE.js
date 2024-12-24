import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Toast } from "primereact/toast";

const IDE = (props) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("js");
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast= useRef(null)

  const languages = [
    { name: "Java", lang: "java" },
    { name: "JavaScript", lang: "js" },
    { name: "Python", lang: "py" },
    { name: "C++", lang: "cpp" },
    { name: "C", lang: "c" },
    { name: "GoLang", lang: "go" },
    { name: "C#", lang: "cs" },
  ];

  const codeTemplates = {
    js: `function abc() {\n  // Write your code here\n}\nconsole.log(abc());`,
    java: `public class Main {\n  public static void main(String[] args) {\n    abc();\n  }\n\n  public static void abc() {\n    // Write your code here\n  }\n}`,
    py: `def abc():\n    # Write your code here\n    print(abc())`,
    cpp: `#include <iostream>\nusing namespace std;\n\nvoid abc() {\n    // Write your code here\n}\n\nint main() {\n    abc();\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nvoid abc() {\n    // Write your code here\n}\n\nint main() {\n    abc();\n    return 0;\n}`,
    go: `package main\n\nimport "fmt"\n\nfunc abc() {\n    // Write your code here\n}\n\nfunc main() {\n    abc()\n}`,
    cs: `using System;\n\nclass Program {\n    static void Main() {\n        abc();\n    }\n\n    static void abc() {\n        // Write your code here\n    }\n}`,
  };

  const languageNames = {
    js: "javascript",
    java: "java",
    py: "python",
    cpp: "cpp",
    c: "c",
    go: "go",
    cs: "csharp",
  };

  useEffect(() => {
    setCode(codeTemplates[language] || codeTemplates["js"]);
  
    const user = JSON.parse(localStorage.getItem("LoggedinUser"));
    const submissions = JSON.parse(localStorage.getItem("submissions")) || {};
  
    if (user?.id && submissions[user.id]) {
      const questionCode = submissions[user.id].filter(
        (q) => q.questionId === props.questionId
      );
  
      if (questionCode.length > 0) {
        setCode(questionCode[0].code);
        setLanguage(questionCode[0].language);
      }
    } else {
      console.log("No submissions found or user is invalid.");
    }
  }, [language, props.questionId]);
  


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty && !isSubmitted) {
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, isSubmitted]);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.codex.jaagrav.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: language,
          input: '',
        }),
      });

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput("Error occurred while running the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value || "");
    setIsDirty(true);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsDirty(false);

    const user = JSON.parse(localStorage.getItem("LoggedinUser"));
    const userId = user?.id || "guest";

    const newSubmission = {
        code: code,
        questionId: props.questionId,
        language: language
    };

    let submissions = JSON.parse(localStorage.getItem("submissions")) || {};

    if (!submissions[userId]) {
        submissions[userId] = [];
    }

    submissions[userId].push(newSubmission);

    localStorage.setItem("submissions", JSON.stringify(submissions));
    toast.current.show({
      severity: 'success',
      summary: 'Submission successful',
      detail: 'Code submitted successfully'
    })

};



  return (
    <React.Fragment>
      <Toast ref={toast}/>
      <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
        <div className="flex space-x-7">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.lang} value={lang.lang}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={runCode}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Running..." : "Run"}
          </button>
          <button
            onClick={() => setCode(codeTemplates[language])}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-md"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-4">
          <Editor
            height="300px"
            defaultLanguage={languageNames[language]} // Set default language to selected language's name
            value={code} // Bind value to `code` state
            theme="vs-dark"
            onChange={handleCodeChange}
          />
        </div>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Output:</h2>
          <div
            className={`p-4 border rounded-md ${
              output ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {loading ? "Running your code..." : output || "No output yet."}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IDE;
