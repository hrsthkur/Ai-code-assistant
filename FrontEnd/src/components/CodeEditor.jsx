import React, { useEffect, useRef, } from "react";

function CodeEditor({handleRun,loading,output,setLang,setCode}) {
  
  const textRef = useRef(null);
 


  useEffect(() => {
    if (textRef.current) {
      const len = textRef.current.value.length;
      textRef.current.focus();
      textRef.current.setSelectionRange(len, len);
    }
  }, []);

  const handleLang = (e) => {
    setLang(e.target.value);
  };


  return (
    <div className="flex-1 bg-[#1e1e1e] text-white p-4">
      <div className="flex justify-between">
        <h2 className="text-lg mb-2  rounded-md font-semibold">Code Editor</h2>
        <select
          onChange={ handleLang}
          name=""
          id=""
          className="bg-gray-800 mb-3 mr-2 rounded"
        >
          <option value="Cpp">C++</option>
          <option value="C">C</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
        <button
          onClick={handleRun}
          disabled = {loading}
          
          className="px-4 py-1 rounded-md font-semibold bg-green-800 mb-2"
        >
          {loading ? 'Running...' : "Run"}
        </button>
      </div>

      <textarea
        spellCheck={false}
        // value={code}
        ref={textRef}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-[50vh] bg-[#252526] text-white font-mono text-sm p-3 rounded-lg outline-none resize-none"
      />
      <div>
        <h3>Output:</h3>
        {output.output || "Your outputw will appear here"}
      </div>
    </div>
  );
}

export default CodeEditor;
