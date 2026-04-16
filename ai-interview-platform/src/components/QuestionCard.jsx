export default function QuestionCard({ question, options, onAnswer }) {

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-semibold mb-6 text-white">
        {question}
      </h2>

      <div className="grid gap-3">

        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="bg-slate-700 hover:bg-cyan-500 p-3 rounded-lg transition"
          >
            {option}
          </button>
        ))}

      </div>

    </div>
  );
}