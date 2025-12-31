import { useState, useRef, useEffect } from "react";

const QuestionCard = ({
  questionData,
  onAnswer,
  currentQuestion,
  totalQuestions,
  lifelineUsed,
  onUseLifeline,
  imageTracker,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const randomNumber = Math.floor(Math.random() * imageTracker.length);

  // 🎤 Voiceover reference
  const voiceRef = useRef(null);

  // ▶️ Play voiceover automatically when question changes
  useEffect(() => {
    if (!voiceRef.current || !questionData.voiceSrc) return;

    voiceRef.current.pause();
    voiceRef.current.currentTime = 0;

    voiceRef.current.play().catch(() => {});
  }, [questionData]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;

    // ⏸ Stop voice when answering
    if (voiceRef.current) {
      voiceRef.current.pause();
    }

    setSelectedAnswer(answer);
    setIsAnswered(true);

    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1500);
  };

  const getOptionClass = (option) => {
    if (!isAnswered) {
      return selectedAnswer === option
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400"
        : "bg-white/10 hover:bg-white/20 text-white border-white/20";
    }

    if (option === questionData.correctAnswer) {
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400";
    }

    if (option === selectedAnswer && option !== questionData.correctAnswer) {
      return "bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-400";
    }

    return "bg-white/5 text-white/50 border-white/10";
  };

  return (
    <div
      data-aos="zoom-in"
      className="min-h-screen bg-linear-to-b from-purple-900/70 to-blue-900/70 p-4"
    >
      {/* 🎧 Hidden Voiceover Audio */}
      <audio ref={voiceRef} src={questionData.voiceSrc} />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stitch Image Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              <img
                src={imageTracker ? imageTracker[randomNumber] : "null"}
                alt={imageTracker}
                className="w-full rounded-2xl shadow-2xl mb-4"
              />

              {/* Lifeline Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-bold mb-3 text-lg">Lifelines</h3>

                <button
                  onClick={onUseLifeline}
                  disabled={lifelineUsed}
                  className={`w-full py-3 px-4 rounded-lg font-bold mb-2 ${
                    lifelineUsed
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  } text-white`}
                >
                  📞 Call: via messenger
                </button>

                <button
                  disabled
                  className="w-full py-3 px-4 bg-gray-600 rounded-lg font-bold text-white cursor-not-allowed"
                >
                  🔀 50/50 (Coming Soon)
                </button>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="lg:w-2/3">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
              {/* Question Counter */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-yellow-400 font-bold text-lg">
                  Question {currentQuestion} of {totalQuestions}
                </div>
                <div className="text-white text-lg">
                  Prize Level:₱
                  {[50, 100, 200, 250, 300, 400, 500][currentQuestion - 1]}.00
                </div>
              </div>

              {/* Question Text */}
              <div
                data-aos="flip-left"
                className="bg-black/30 rounded-xl p-6 mb-8 border border-white/10"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  {questionData.question}
                </h2>
              </div>

              {/* Options Grid */}
              <div
                data-aos="flip-right"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {["A", "B", "C", "D"].map((letter, index) => (
                  <button
                    key={letter}
                    onClick={() =>
                      handleAnswerSelect(questionData.options[index])
                    }
                    disabled={isAnswered}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${getOptionClass(
                      questionData.options[index]
                    )} ${isAnswered ? "cursor-default" : "hover:scale-105"}`}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 font-bold">
                      {letter}
                    </div>
                    <span className="text-lg font-medium text-left flex-1">
                      {questionData.options[index]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
