import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import MessageList from '../components/MessageList'
import ChatInput from '../components/ChatInput'

function Home() {
const [messages,setMessages] = useState([]);

const [loading,setLoading] = useState(false)
 const [language, setLang] = useState("Cpp");
 const [code, setCode] = useState("// Write your code here...\n");

const [output, setOutput] = useState({});
  




  const handleRun = async () => {
    setLoading(true)
    setOutput("Runnig your code")
    try{
     const res = await fetch("https://ai-code-assistant-bnli.onrender.com/analyze",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({code,language})

     })
     const data = await res.json();
     setOutput((data));
     console.log("Backend Response:", data);
     const explanation = data.explanation
     const bugs = data.bugs
     const suggestions = data.suggestions
     setMessages((prev) => [...prev,{role:"ai",content:`Explanation: ${explanation}`}])
     setMessages((prev) => [...prev,{role:"ai",content:`Bugs: ${bugs}`}])
     setMessages((prev) => [...prev,{role:"ai",content:`Suggestions: ${suggestions}`}])

     //console.log("Backend Response:", data);
    }
    catch (err){
      setOutput("Error executing code ");

    }
    finally{
      setLoading(false)
    }
    
    

  };



const onSend =async (input)=>{
  setMessages((prev) => [...prev,{role:"user",content:input}])
  setLoading(true)
  
  try {

    // await new Promise((r)=> setTimeout(r,1000));
    // const reply = `You said "${input}"`
    // setMessages((prev) => [...prev,{role:"ai",content: reply}])

    //dummy response

     const res = await fetch("https://ai-code-assistant-bnli.onrender.com/send",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({code,language,input})

      
     })
     const data = await res.json()
     console.log("Send API Response:", data);
      setMessages((prev) => [...prev,{role:"ai",content:data}])

    
  } catch (error) {
    setMessages((prev) => [...prev,{role:"ai",content:"Error "}])
    
  }
  finally {

    setLoading(false)}



}
  return (
    <div className='flex flex-col h-[90vh] ' >
        <div className='flex-1 flex '>
            <CodeEditor handleRun={handleRun} loading={loading} output={output} setLang={setLang} setCode={setCode}/>
            <div className='flex-1  flex flex-col bg-[#1e1e1e]'>
                <MessageList messages={messages}/>
                <ChatInput onSend={onSend} />
            </div>
        </div>
    </div>
  )
}

export default Home
