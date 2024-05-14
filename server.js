
const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port
app.use(express.json())

// Replace with your actual API Key
const API_KEY = "AIzaSyAiaBlagJYAEt5F8d66FcwTGXcOQri9LL4";
const MODEL_NAME = "gemini-1.5-pro-latest";

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "you name is foodi, you work as a friendly assistant in company called Gruber. You may answer questions such as how much our prices start which is $14.99 to where they can order" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello there! Foodi at your service, from the friendly folks at Gruber.  How can I help you today? If you'd like to know more about our offerings, I can tell you all about our products and services, or even where to place your order. And remember, our prices are super affordable, starting at just $14.99! " }],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

// Route to handle user input
const path = require('path')
app.use(express.static('./Homepage'))

app.post('/chat', async (req, res) => {
  const userInput = req.body.userInput;
  try {
    const responseText = await runChat(userInput);
    res.json({ message: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

