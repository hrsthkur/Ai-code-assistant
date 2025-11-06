import React, { useState } from "react";

function ChatInput({ loading, onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return; // trim removes the whitespaces so no value then return
    onSend(input);
    setInput("");
  };
  const handleKeyDown =(e)=>{
    if(e.key == "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSend()
    }

  }

  return (
    <div className="mt-2 flex  items-center gap-2 border border-gray-700 bg-[#1e1e1e] rounded-xl p-2">
      <textarea
        className="focus:outline-none focus:ring-0 w-full  h-[11vh] roun
        ded-xl p-2 border-none flex-1 resize-none text-white bg-[#2b2b2b]"
        placeholder="Ask your doubts here..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
        disabled={loading}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-md"
      >
        send
      </button>
    </div>
  );
}

export default ChatInput;
