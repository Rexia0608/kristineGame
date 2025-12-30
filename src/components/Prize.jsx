// src/components/Prize.jsx
import { useNavigate } from "react-router-dom";
import QRCodeImage from "../assets/qr-code.png";
import useGameState from "../hooks/useGameState";

const Prize = () => {
  const navigate = useNavigate();
  const { logout } = useGameState();
  const { playAudio } = useGameState();

  const handleDownloadQR = () => {
    playAudio("/audio/instruction.mp3", 0.5);
    const link = document.createElement("a");
    link.href = QRCodeImage;
    link.download = "egift-certificate-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
            🏆 Your Prize
          </h1>
          <div className="space-x-4">
            <button
              onClick={handleBackToHome}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Back to Home
            </button>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              CONGRATULATIONS! 🎉
            </h2>
            <p className="text-xl text-white/90 mb-2">
              You've won an eGift Certificate!
            </p>
            <p className="text-white/80">
              Scan the QR code below to redeem your prize
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <img
                  src={QRCodeImage}
                  alt="eGift Certificate QR Code"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>

            <div className="md:w-1/2 text-center md:text-left">
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    Instructions
                  </h3>
                  <p className="text-white text-lg mb-4">
                    "Scan this QR to redeem your eGift certificate."
                  </p>
                  <ul className="text-white/90 space-y-2">
                    <li>• Open your phone's camera app</li>
                    <li>• Point at the QR code</li>
                    <li>• Tap the notification that appears</li>
                    <li>• Follow redemption instructions</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleDownloadQR}
                    className="w-full py-4 px-6 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-xl text-white transform hover:scale-105 transition-all duration-200"
                  >
                    📥 DOWNLOAD QR CODE
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-4 px-6 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-bold text-xl text-white transform hover:scale-105 transition-all duration-200"
                  >
                    🖨️ PRINT THIS PAGE
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-white/70">
            <p className="text-sm">
              You won! Here is your Miniso eGift Certificate. Please follow the
              QR link provided. (Note: This is not sponsored). Click the link to
              secure your certificate and remember to take a screenshot for your
              records, or download the eGift directly. Please do not share this
              with anyone else!
            </p>
            <p className="text-xs mt-2">© 2025 | Developed by John Rey C.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prize;
