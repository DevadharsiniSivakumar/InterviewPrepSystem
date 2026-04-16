const pool = require("../db");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

exports.getQuestions = async (req,res)=>{

const result = await pool.query(
"SELECT * FROM questions"
)

res.json(result.rows)

}

exports.submitTest = async (req,res)=>{

const {user_id,score,total} = req.body

await pool.query(
"INSERT INTO results(user_id,score,total_questions) VALUES($1,$2,$3)",
[user_id,score,total]
)

res.json({message:"Result stored"})

}

exports.getUserStats = async (req,res)=>{
  try {
    const { user_id } = req.params;
    
    const result = await pool.query("SELECT * FROM results WHERE user_id = $1 ORDER BY created_at ASC", [user_id]);
    
    const testsCompleted = result.rows.length;
    let averageScore = 0;
    let ranking = "Unranked";
    
    if (testsCompleted > 0) {
      const totalPercentage = result.rows.reduce((sum, row) => sum + ((row.score / row.total_questions) * 100), 0);
      averageScore = Math.round(totalPercentage / testsCompleted);
      
      const allAveragesResult = await pool.query(`
        SELECT user_id, AVG(score * 100.0 / total_questions) as avg_score 
        FROM results 
        GROUP BY user_id
      `);
      
      const allAverages = allAveragesResult.rows.map(r => Number(r.avg_score)).sort((a,b) => b - a);
      const belowCount = allAverages.filter(score => score < averageScore).length;
      const percentile = Math.round((belowCount / allAverages.length) * 100);
      
      let topPercent = 100 - percentile;
      if (topPercent === 0) topPercent = 1;
      ranking = `Top ${topPercent}%`;
    }
    
    
    const history = result.rows.map((row, idx) => ({
      name: `Test ${idx + 1}`,
      scorePercentage: Math.round((row.score / row.total_questions) * 100)
    }));

    res.json({
      testsCompleted: testsCompleted.toString(),
      averageScore: averageScore + "%",
      ranking: ranking,
      history
    });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

exports.generateAIQuestions = async (req, res) => {
  try {
    const domain = req.query.domain;
    let topicStr = "random modern CS topics (like React, Node.js, databases, AWS)";
    if (domain && domain.trim() !== "") {
      topicStr = `specifically focused on the domain: ${domain}`;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Mock fallback if user hasn't provided key yet
      return res.json([
        { question: `[NO API KEY] What is a key concept in ${domain || "CS"}?`, option_a: "A", option_b: "B", option_c: "C", option_d: "D", answer: "A" },
        { question: "[NO API KEY] Best language for data sci?", option_a: "Java", option_b: "C", option_c: "Python", option_d: "Ruby", answer: "C" },
        { question: "[NO API KEY] HTTP port?", option_a: "80", option_b: "443", option_c: "22", option_d: "21", answer: "A" },
        { question: "[NO API KEY] What is Docker?", option_a: "A boat", option_b: "Container system", option_c: "Database", option_d: "Language", answer: "B" }
      ]);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Added a seed using Date.now() and explicitly asked for randomization so questions are different each time
    const prompt = `Generate 4 distinct software engineering interview questions ${topicStr}.
    Ensure the questions are highly randomized, wildly different from standard textbook examples, and unique.
    Use this seed to guarantee randomness: ${Date.now()}_${Math.random()}.
    Format EXACTLY as a raw JSON array of objects.
    Do NOT include markdown formatting like \`\`\`json.
    Each object must have strictly these keys: "question", "option_a", "option_b", "option_c", "option_d", "answer". 
    The "answer" key should only be a single uppercase letter: "A", "B", "C", or "D".`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const questions = JSON.parse(text);
    res.json(questions);

  } catch (err) {
    console.error("AI Generation Error:", err.message || err);
    // Return fallback questions instead of throwing a 500 error
    const reqDomain = req.query.domain;
    return res.json([
        { question: `[QUOTA EXCEEDED] What is a key concept in ${reqDomain || "CS"}?`, option_a: "Abstractions", option_b: "Typos", option_c: "Magic", option_d: "Errors", answer: "A" },
        { question: "[QUOTA EXCEEDED] Most common HTTP port?", option_a: "80", option_b: "443", option_c: "22", option_d: "21", answer: "A" },
        { question: "[QUOTA EXCEEDED] What does CSS stand for?", option_a: "Cascading Style Sheets", option_b: "Computer Style System", option_c: "Creative Style System", option_d: "Custom Style Sheet", answer: "A" },
        { question: "[QUOTA EXCEEDED] What is JSON?", option_a: "JavaScript Object Notation", option_b: "Java Standard Output Network", option_c: "JavaScript Oriented Network", option_d: "Java Syntax Object Notation", answer: "A" }
    ]);
  }
}