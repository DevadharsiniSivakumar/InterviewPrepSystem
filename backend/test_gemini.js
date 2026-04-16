const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function run() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate 4 distinct software engineering interview questions spanning random modern CS topics (like React, Node.js, databases, AWS).
    Format EXACTLY as a raw JSON array of objects.
    Do NOT include markdown formatting like \`\`\`json.
    Each object must have strictly these keys: "question", "option_a", "option_b", "option_c", "option_d", "answer". 
    The "answer" key should only be a single uppercase letter: "A", "B", "C", or "D".`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const questions = JSON.parse(text);
    console.log("Success:", questions);
  } catch(e) {
    console.log("ERROR MESSAGE:", e.message);
  }
}
run();
