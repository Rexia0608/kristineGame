// src/components/Game.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import { questions } from "../data/questions";
import useGameState from "../hooks/useGameState";

const Game = () => {
  const navigate = useNavigate();
  const { incrementPlayCount, canPlayGame, setHasWonMaxPrize, playAudio } =
    useGameState();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!canPlayGame()) {
      navigate("/");
      return;
    }
  }, [canPlayGame, navigate]);

  const startGame = () => {
    incrementPlayCount();
    setGameStarted(true);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      if (currentQuestionIndex === questions.length - 1) {
        // All questions answered correctly
        setGameState("won");
        setHasWonMaxPrize(true);
        setTimeout(() => {
          navigate("/prize");
        }, 2000);
      } else {
        // Move to next question
        playAudio("/audio/correct.mp3", 0.2);
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        playAudio(currentQuestion.wrongAudio, 0.2);
        playAudio("/audio/wrongbuzz.mp3", 0.3);
      }, 800);
      // Check if user answered all 7 questions but not all correct
      if (currentQuestionIndex === questions.length - 1) {
        // User reached question 7 but got it wrong
        // Reset play count for today
        localStorage.setItem("playCount", 0);
      }

      setGameState("lost");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const handleUseLifeline = () => {
    if (!lifelineUsed) {
      alert("Calling jay... This will be routed to your messenger");
      window.open(
        "https://www.messenger.com/t/100006856233482",
        "_blank",
        "noopener,noreferrer"
      );
      setLifelineUsed(true);
    }
  };

  if (!gameStarted) {
    return (
      <div
        data-aos="flip-left"
        className="min-h-screen bg-linear-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-6">
            Ready to Play?
          </h1>
          <p className="text-white text-lg mb-8">
            You'll have 7 questions to answer. Get all 7 right to win the
            maximum prize!
          </p>
          <button
            onClick={startGame}
            className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl text-2xl transform hover:scale-105 transition-all duration-200"
          >
            START GAME!
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "won") {
    return (
      <div
        data-aos="flip-left"
        className="min-h-screen bg-linear-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            CONGRATULATIONS!
          </h1>
          <p className="text-white text-2xl mb-6">
            You answered all 7 questions correctly!
          </p>
          <p className="text-green-400 text-3xl font-bold mb-8">
            YOU WON THE MAXIMUM PRIZE!
          </p>
          <p className="text-white/80 mb-8">Redirecting to prize page...</p>
        </div>
      </div>
    );
  }

  if (gameState === "lost") {
    return (
      <div
        data-aos="flip-left"
        className="min-h-screen bg-linear-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">GAME OVER</h1>
          <p className="text-white text-2xl mb-6">That was incorrect!</p>
          <p className="text-white text-xl mb-8">
            The correct answer was:{" "}
            <span className="font-bold text-green-400">
              {questions[currentQuestionIndex].correctAnswer}
            </span>
          </p>
          <p className="text-white/80 mb-8">Better luck next time!</p>
          <p className="text-white/60">Returning to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      questionData={questions[currentQuestionIndex]}
      onAnswer={handleAnswer}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      lifelineUsed={lifelineUsed}
      onUseLifeline={handleUseLifeline}
      imageTracker={questions[currentQuestionIndex].picture}
    />
  );
};

export default Game;
