import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { submitTest, generateQuestions } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const domain = location.state?.domain || "";
  const user = JSON.parse(localStorage.getItem("user"));

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await generateQuestions(domain);
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };
    fetchQuestions();
  }, []);

  // Initialize bot chat when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
      appendBotQuestion(0);
    }
  }, [questions]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const appendBotQuestion = (index) => {
    const q = questions[index];
    const text = `Question ${index + 1}: ${q.question}\nA) ${q.option_a}\nB) ${q.option_b}\nC) ${q.option_c}\nD) ${q.option_d}\n\nPlease type your answer (A, B, C, or D).`;
    setMessages(prev => [...prev, { sender: "ai", text }]);
  };

  const handleSend = async () => {
    if (!inputData.trim() || isFinished) return;
    
    const userMsg = inputData.trim().toUpperCase();
    const currQuestion = questions[current];
    
    setMessages(prev => [...prev, { sender: "user", text: inputData }]);
    setInputData("");

    // Simulate AI thinking delay
    setTimeout(async () => {
      let isCorrect = false;
      let reply = "";

      // Evaluation
      if (userMsg === currQuestion.answer.toUpperCase() || userMsg.includes(currQuestion.answer.toUpperCase())) {
         isCorrect = true;
         reply = "Excellent! That is correct.";
         setScore(prev => prev + 1);
      } else {
         reply = `Not quite. The correct answer was ${currQuestion.answer}.`;
      }

      setMessages(prev => [...prev, { sender: "ai", text: reply }]);

      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setTimeout(() => appendBotQuestion(next), 1000); // Ask next question
      } else {
        setIsFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        setMessages(prev => [...prev, { sender: "ai", text: `Test Complete! You scored ${finalScore} out of ${questions.length}. Saving your results...` }]);
        
        // Submit test
        try {
          if (user?.id) {
             await submitTest({ user_id: user.id, score: finalScore, total: questions.length });
          }
          setTimeout(() => navigate("/results", { state: { score: finalScore } }), 2000);
        } catch (err) {
          console.error("Submission failed", err);
          alert("Failed to submit results metrics.");
          navigate("/results", { state: { score: finalScore } });
        }
      }
    }, 800);
  };

  if (questions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="flex-1 flex items-center justify-center h-full"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-[var(--color-primary)] rounded-full animate-spin mb-4"></div>
          <p className="text-slate-300 font-medium tracking-wide">AI Interviewer is preparing your test...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col items-center py-10 px-4 relative overflow-y-auto"
    >
      <div className="w-full max-w-[800px] flex-1 flex flex-col glass-panel rounded-3xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900/60 p-5 px-8 border-b border-[var(--color-glass-border)] flex justify-between items-center z-10 backdrop-blur-md">
           <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
             <h1 className="text-xl font-bold text-white tracking-wide">AI Interviewer <span className="text-slate-400 font-normal text-sm ml-2">{domain ? `(${domain})` : ""}</span></h1>
           </div>
           <span className="bg-slate-800 text-[var(--color-primary)] px-4 py-1.5 rounded-full font-bold text-sm border border-[var(--color-primary)]/20">
             Score: {score}/{questions.length}
           </span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto w-full h-[500px] space-y-6 relative custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`
                  p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-lg text-sm md:text-base leading-relaxed
                  ${msg.sender === "user" 
                    ? "bg-[var(--color-primary)] text-slate-900 rounded-br-sm font-medium" 
                    : "bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-bl-sm"}
                `}>
                  {msg.sender === "ai" && <span className="block font-bold text-xs mb-2 text-[var(--color-primary)] uppercase tracking-wider">AI Assistant</span>}
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-5 bg-slate-900/60 border-t border-[var(--color-glass-border)] z-10 backdrop-blur-md">
           <div className="flex gap-3">
             <input 
               type="text" 
               className="flex-1 bg-slate-950/50 text-white rounded-xl px-5 py-4 border border-slate-700 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-slate-500 shadow-inner" 
               placeholder={isFinished ? "Test completed." : "Type your answer here... (A, B, C, or D)"}
               value={inputData}
               onChange={(e) => setInputData(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
               disabled={isFinished}
               autoFocus
             />
             <button 
               onClick={handleSend} 
               disabled={isFinished || !inputData.trim()}
               className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center
                 ${isFinished || !inputData.trim() ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 shadow-[0_0_15px_var(--color-primary-glow)] transform hover:scale-[1.02]"}
               `}
             >
               Send
             </button>
           </div>
        </div>

      </div>
    </motion.div>
  );
}