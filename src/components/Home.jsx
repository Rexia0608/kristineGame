// src/components/Home.jsx
import { useNavigate } from "react-router-dom";
import useGameState from "../hooks/useGameState";
import StitchImageWelcome from "../assets/stitchCheerUp.gif";
import { useEffect, useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { canPlayGame, hasWonMaxPrize, logout } = useGameState();

  // 🎤 Voiceover reference
  const audioRef = useRef(null);

  // ▶️ Autoplay voiceover on page load
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {
      console.log("Autoplay blocked");
    });

    // ⏹ Stop audio when leaving page (SAFE)
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handlePlayGame = () => {
    navigate("/game");
  };

  const handleSeePrize = () => {
    navigate("/prize");
  };

  const isPlayDisabled = !canPlayGame() || hasWonMaxPrize;

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900/70 to-blue-900/70 p-4 rounded-b-sm">
      <audio ref={audioRef} src="/audio/voiceover.mp3" preload="auto" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
            Stitch Wants to Be a MILLIONAIRE
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="flex-1">
            <img
              src={StitchImageWelcome}
              alt="Stitch"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex-1 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Aloha, I'm Stitch!
              </h2>
              <p className="text-white/90 text-lg mb-8">
                I’m your host for this exciting game! Answer 7 of Jay’s
                questions correctly and win a{" "}
                <span className="text-orange-500 text-lg mb-8 font-bold">
                  Miniso E-gift Certifcate{" "}
                </span>
                No Eme!
              </p>

              <div className="space-y-6">
                <button
                  onClick={handlePlayGame}
                  disabled={isPlayDisabled}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-xl transform transition-all duration-200 ${
                    isPlayDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105"
                  } text-white`}
                >
                  {hasWonMaxPrize ? "🏆 PRIZE WON!" : "🎮 PLAY THE GAME"}
                </button>

                {isPlayDisabled && !hasWonMaxPrize && (
                  <p className="text-yellow-300 text-sm">
                    Daily limit reached! Come back tomorrow to play again.
                  </p>
                )}

                {/* <button
                  onClick={handleSeePrize}
                  className="w-full py-4 px-6 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-bold text-xl text-white transform hover:scale-105 transition-all duration-200"
                >
                  🏆 SEE PRIZE & DOWNLOAD
                </button> */}
              </div>

              <div className="mt-8 text-white/80">
                <h3 className="text-xl font-bold mb-2">Game Details:</h3>
                <ul className="text-left space-y-2">
                  <li>• Please play this on a laptop.</li>
                  <li>• Maximum 7 questions get ready!</li>
                  <li>• Answer all 7 correctly to win maximum prize!</li>
                  <li>• Wrong answer ends the game</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
