// src/hooks/useGameState.js
import { useState, useEffect } from "react";

const useGameState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [playCount, setPlayCount] = useState(() => {
    const stored = localStorage.getItem("playCount");
    return stored ? parseInt(stored) : 0;
  });

  const [lastPlayDate, setLastPlayDate] = useState(() => {
    return localStorage.getItem("lastPlayDate") || "";
  });

  const [hasWonMaxPrize, setHasWonMaxPrize] = useState(() => {
    return localStorage.getItem("hasWonMaxPrize") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("playCount", playCount);
  }, [playCount]);

  useEffect(() => {
    localStorage.setItem("lastPlayDate", lastPlayDate);
  }, [lastPlayDate]);

  useEffect(() => {
    localStorage.setItem("hasWonMaxPrize", hasWonMaxPrize);
  }, [hasWonMaxPrize]);

  const incrementPlayCount = () => {
    const today = new Date().toDateString();
    if (lastPlayDate !== today) {
      setPlayCount(2);
      setLastPlayDate(lastPlayDate);
    } else {
      setPlayCount((prev) => prev + 1);
    }
  };

  const canPlayGame = () => {
    if (hasWonMaxPrize) return false;

    const today = new Date().toDateString();
    if (lastPlayDate !== today) {
      return true;
    }
    return playCount < 2;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const resetPlayCount = () => {
    setPlayCount(0);
  };

  const playAudio = (src, vol) => {
    const audio = new Audio(src);
    audio.volume = vol;
    audio.play();
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    playCount,
    incrementPlayCount,
    canPlayGame,
    hasWonMaxPrize,
    setHasWonMaxPrize,
    logout,
    resetPlayCount,
    playAudio,
  };
};

export default useGameState;
