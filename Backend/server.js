import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));

app.use(express.json());


app.post("/analyze", async(req,res) => {
    const {code,language} = req.body;

    try {
        const prompt = `
        You are an expert ${language} developer. Analyze the following code ${code}
        return the response in JSON structure:
        {
        "output": "...",
        "explanation":"....",
        "bugs":"...",
        "suggestions":"....."
        }
        `;

        const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
   {
      model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content: `You are an expert ${language} developer. Analyze the provided code.`
          },
          {
            role: "user",
            content: `
Analyze this code and return a object only response in exactly this format:
{
"role":"ai",
"output": "...",
"explanation": "...",
"bugs": "...",
"suggestions": "...",
"optimization": "..."
}

Code:
${code}
`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
     
    
 

        const text = response.data.choices[0].message.content;
        let json;
    try {
      json = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      json = match ? JSON.parse(match[0]) : null;
    }

    if (!json) {
      return res.json({
        explanation: "",
        bugs: "",
        suggestions: "",
        optimization: "",
        raw: text
      });
    }

    return res.json(json);
        
    } catch (error) {
  console.log(" SERVER ERROR:");
  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  } else {
    console.log("Message:", error.message);
  }
  return res.status(500).json({ error: "AI request failed" });
}

})

app.post("/send", async(req,res) => {
 
  
   const {code,language,input} = req.body;
   try {
        const prompt = `
        You are an expert ${language} developer. and here is the code ${code} for context, I am asking question regarding this code
        return a short and crisp response in string with  and my question is ${input} , 
        `;

        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
           {
      model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt
          }]
        },
        {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }})
        const text = response.data.choices[0].message.content;

       return res.json(text)
        
        
      }
       catch(err){
        return res.status(500).json({error: "AI request failed"})
          
          

        }
    })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running"));
