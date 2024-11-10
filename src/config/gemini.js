// node --version #should be >=18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCoMYm3s31STfh5NtQyCZJPxo9IUKBOH-U";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  // Check if result.response exists before accessing text()
  if (result.response && result.response.text) {
    console.log(result.response.text());
    return result.response.text(); // Ensure it returns the proper text
  } else {
    console.error("Error: Response or response.text is undefined", result);
    return "Sorry, there was an issue with the response."; // Optional error message
  }
}

export default run;
