import React, { useEffect, useRef } from 'react'

function MessageList({ messages }) {
  const containerRef = useRef(null)

  useEffect(()=>{
    containerRef.current?.scrollTo({
      top:containerRef.current.scrollHeight,
      behavior: "smooth",
    })

  },[messages])
  return (
    <div 
    className='space-y-3 overflow-hidden overflow-y-auto'
    >
       <h2 className="text-lg m-3  text-white rounded-md text-center font-semibold">Ask AI for help !</h2>
      {/* {messages.length === 0 &&
       (<p className='text-gray-400 text-center italic'>
          Start Chatting with AI ✨
        </p>
        )} */}
      <div ref={containerRef} className='pt-1 chat-scroll flex flex-col space-y-3 p-4 rounded-xl h-[70vh] overflow-y-auto  bg-[#2b2b2b]'>
    {  messages.map((msg,idx) => (
        <div key={idx}
        className={` flex ${msg.role === "user" ? "justify-end" : "justify-start" }`}
        >
          <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl bg-[#1e1e1e] ${ msg.role === "user" 
              ? "bg-blue-500 text-white py-3 rounded-br-none"
              : "bg-gray-300 text-black rounded-bl-none"

            }`}
            >
            {msg.content}
          </div>
        </div>
        
      ))} 
      </div>
     
    </div>
  )
}

export default MessageList;
