import { useState, useEffect } from "react";
import "./App.css";
import Title from "./components/Title";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";

const WORDS = ["APPLE", "BERRY", "CHARM", "DREAM", "EAGLE", "HOUSE", "LIGHT"];
const solutionWord = WORDS[Math.floor(Math.random() * WORDS.length)];

function App() {
  const [pastGuesses, setPastGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [results, setResults] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS"); // NEW

  // NEW: This tracks the colors of every letter on the keyboard
  const [keyboardStatus, setKeyboardStatus] = useState({});

  const checkGuess = (guess) => {
    const result = Array(5).fill("absent");
    const targetLetters = solutionWord.split("");

    for (let i = 0; i < 5; i++) {
      if (guess[i] === targetLetters[i]) {
        result[i] = "correct";
        targetLetters[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (result[i] !== "correct" && targetLetters.includes(guess[i])) {
        result[i] = "present";
        targetLetters[targetLetters.indexOf(guess[i])] = null;
      }
    }
    return result;
  };

  const handleKeyPress = (key) => {
    if (gameStatus !== "IN_PROGRESS") return; // Stop input if game is over

    if (key === "ENTER") {
      if (currentGuess.length !== 5) return;

      const newResults = checkGuess(currentGuess);

      // Update keyboard colors
      const newKeyboardStatus = { ...keyboardStatus };
      for (let i = 0; i < 5; i++) {
        const letter = currentGuess[i];
        const status = newResults[i];
        // Don't overwrite a green key with a yellow/gray key
        if (newKeyboardStatus[letter] !== "correct") {
          newKeyboardStatus[letter] = status;
        }
      }
      setKeyboardStatus(newKeyboardStatus);

      setPastGuesses([...pastGuesses, currentGuess]);
      setResults([...results, newResults]);
      setCurrentGuess("");

      // Check Win/Loss
      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      } else if (pastGuesses.length === 5) {
        setGameStatus("LOST");
      }

    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5 && key.length === 1) {
      setCurrentGuess(currentGuess + key);
    }
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (e) => {
      if (e.key === "Enter") handleKeyPress("ENTER");
      else if (e.key === "Backspace") handleKeyPress("BACKSPACE");
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handlePhysicalKeyPress);
    return () => window.removeEventListener("keydown", handlePhysicalKeyPress);
  }, [currentGuess, pastGuesses, results, gameStatus, keyboardStatus]);

  return (
    <div className="app-container">
      <Title />
      <GameBoard guesses={pastGuesses} currentGuess={currentGuess} results={results} />

      {/* Pass keyboard colors to the keyboard */}
      <Keyboard onKeyPress={handleKeyPress} keyboardStatus={keyboardStatus} />

      {/* Game Over Modal */}
      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal">
          <div className="modal-content">
            <h2>{gameStatus === "WON" ? "You Won!" : "Game Over"}</h2>
            <p>The word was: <strong>{solutionWord}</strong></p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

