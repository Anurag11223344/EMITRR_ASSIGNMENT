import React, { useState, useEffect, useCallback } from 'react';
import { levels, Level } from '../game/levels'; // Adjust relative path if needed
import { CheckCircle2, XCircle, Moon, Sun, RefreshCw, ChevronRight, Zap, Lightbulb, Target } from 'lucide-react';

// --- MOCK DATA & TYPES ---
const GRID_SIZE = 5;

type GameState = 'observing' | 'guessing' | 'result';
// --- END MOCK DATA & TYPES ---

interface GameProps {
  darkMode: boolean; // Now receiving darkMode as a prop
}

// --- MAIN GAME COMPONENT (All Logic & UI Consolidated) ---
const Game: React.FC<GameProps> = ({ darkMode }) => { // Accept prop
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<GameState>('observing');
  const [flashingSquares, setFlashingSquares] = useState<number[]>([]);
  const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
  const [correctSquares, setCorrectSquares] = useState<number[]>([]);
  const [incorrectSquares, setIncorrectSquares] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const level = levels[currentLevel];
  const isCorrect = correctSquares.length === flashingSquares.length && incorrectSquares.length === 0;
  const isLastLevel = currentLevel === levels.length - 1;
  const disabled = gameState === 'observing' || gameState === 'result';

  // --- LOGIC FUNCTIONS ---
  const calculatePatternSquares = useCallback(() => level.rule(), [level]);

  const startObservation = useCallback(() => {
    setGameState('observing');
    setSelectedSquares([]);
    setCorrectSquares([]);
    setIncorrectSquares([]);
    setShowHint(false);
    setTimeLeft(10);
    setFlashingSquares(calculatePatternSquares());
    setIsFlashing(true);
  }, [calculatePatternSquares]);

  useEffect(() => { startObservation(); }, [currentLevel, startObservation]);

  useEffect(() => {
    if (gameState === 'observing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'observing' && timeLeft === 0) {
      setIsFlashing(false);
      setGameState('guessing');
    }
  }, [gameState, timeLeft]);

  const handleSquareClick = (index: number) => {
    if (gameState !== 'guessing') return;
    setSelectedSquares((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    if (gameState !== 'guessing') return;
    const pattern = calculatePatternSquares();
    const correct = selectedSquares.filter((i) => pattern.includes(i));
    const incorrect = selectedSquares.filter((i) => !pattern.includes(i));
    const missed = pattern.filter((i: number) => !selectedSquares.includes(i));
    setCorrectSquares(correct);
    setIncorrectSquares([...incorrect, ...missed]);

    const isAnswerCorrect = correct.length === pattern.length && incorrect.length === 0;
    if (isAnswerCorrect) setScore((prev) => prev + 100);
    else setShowHint(true);
    setGameState('result');
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) setCurrentLevel((prev) => prev + 1);
    else { setCurrentLevel(0); setScore(0); startObservation(); }
  };

  const handleRetry = () => startObservation();
  const handleReset = () => { setCurrentLevel(0); setScore(0); startObservation(); };

  // --- UI HELPER: GRID SQUARE STYLING ---
  const getSquareClass = (index: number) => {
    let base = 'aspect-square flex items-center justify-center font-bold text-base rounded-lg transition-all duration-300 shadow-md cursor-pointer select-none border';

    // Result State Coloring
    if (correctSquares.length > 0 || incorrectSquares.length > 0) {
      // KEEPING EMERALD FOR CORRECT
      if (correctSquares.includes(index)) return `${base} bg-emerald-500 dark:bg-emerald-600 text-white border-emerald-600`; 
      if (incorrectSquares.includes(index)) return `${base} bg-rose-500 dark:bg-rose-700 text-white opacity-80 border-rose-600`;
    }

    // Flashing State Coloring (NEW: Sky/Indigo)
    if (isFlashing && flashingSquares.includes(index)) {
      return `${base} bg-sky-500 text-white border-sky-400 dark:border-sky-600 animate-pulse-fast`;
    }

    // Guessing State Coloring (NEW: Indigo)
    if (selectedSquares.includes(index)) {
      return `${base} bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500`;
    }

    // Default State (NEW: Softer Gray/Slate)
    return `${base} ${darkMode 
      ? 'bg-slate-700 text-slate-400 hover:bg-slate-600 border-slate-600 shadow-inner' 
      : 'bg-white text-gray-500 hover:bg-gray-100 border-gray-200 shadow-md hover:shadow-lg'} 
      ${disabled ? 'cursor-not-allowed opacity-80' : ''}`;
  };

  // --- UI HELPER: Button Class Base ---
  const buttonBase = 'flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.97] focus:outline-none focus:ring-4 font-inter';


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-gray-800'} transition-colors duration-300 p-4 sm:p-8`} style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="max-w-4xl mx-auto py-4">

        {/* --- LEVEL INFO / HEADER (New Indigo/Sky Accent) --- */}
        <header className={`flex justify-between items-center mb-6 py-4 px-4 transition-colors duration-300 border-b ${darkMode 
            ? 'bg-slate-950 border-slate-800' 
            : 'bg-slate-50 border-slate-200'}`}>
          
          <div className="flex items-center space-x-3">
            <Target size={28} className="text-indigo-600 dark:text-indigo-400" />
            <div className="flex flex-col">
              <h1 className="text-xl font-black font-alegreya uppercase tracking-widest leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-sky-400">
                  PatternRecall PRO
                </span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-0.5">
                Visual Memory Precision
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 font-inter uppercase">LEVEL</p>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-alegreya">
                {currentLevel + 1} / {levels.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 font-inter uppercase">SCORE</p>
              <p className="text-sm font-bold text-emerald-500 dark:text-emerald-400 font-alegreya">
                {score}
              </p>
            </div>
          </div>
        </header>
        {/* --- END LEVEL INFO --- */}


        {/* --- MAIN GAME CARD (New Slate/White Base) --- */}
        <div className={`rounded-xl shadow-2xl p-6 sm:p-8 mb-6 transition-colors duration-300 ${
          darkMode ? 'bg-slate-800 shadow-slate-700/50' : 'bg-white shadow-indigo-100/70'
        }`}>
          <div className="mb-6 text-center">
            <h2 className={`text-xl font-bold mb-1 font-alegreya uppercase ${
              darkMode ? 'text-indigo-400' : 'text-indigo-700'
            }`}>
              {level.name}
            </h2>
            <p className={`text-sm font-inter ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {level.description}
            </p>
          </div>

          {/* --- GAME STATE HEADER --- */}
          {gameState === 'observing' && (
            <div className="mb-6 text-center">
              <div className={`text-base font-bold flex justify-center items-center space-x-2 ${
                darkMode ? 'text-sky-400' : 'text-sky-600'
              } font-alegreya uppercase`}>
                <Zap size={16} />
                <span>MEMORIZE PATTERN ({timeLeft}s)</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 shadow-inner">
                <div
                  className="bg-sky-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                />
              </div>
            </div>
          )}

          {gameState === 'guessing' && (
            <div className="mb-6 text-center">
              <div className={`text-base font-bold ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              } font-alegreya uppercase`}>
                ACTION: Select the Pattern
              </div>
              <div className={`text-xs mt-1 font-inter ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Selected: <span className="font-bold text-indigo-500">{selectedSquares.length}</span> squares
              </div>
            </div>
          )}
          {/* --- END GAME STATE HEADER --- */}


          {/* --- GRID (New Slate Border/Background) --- */}
          <div
            className="grid gap-3 p-5 rounded-xl mx-auto bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`, maxWidth: '400px' }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => (
              <div
                key={index}
                className={getSquareClass(index) + (disabled ? ' pointer-events-none' : '')}
                onClick={() => handleSquareClick(index)}
              >
                {/* Show number unless currently flashing */}
                {(!isFlashing || disabled) ? index + 1 : ''}
              </div>
            ))}
          </div>
          {/* --- END GRID --- */}


          {/* --- CONTROLS (New Indigo Button) --- */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-6 font-inter">
            <button onClick={handleReset} className={`${buttonBase} ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 focus:ring-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 shadow-md'}`}>
              <RefreshCw size={16} />
              <span>Reset Game</span>
            </button>

            {gameState === 'guessing' && (
              <button onClick={handleSubmit} className={`${buttonBase} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed`} disabled={selectedSquares.length === 0}>
                <CheckCircle2 size={16} />
                <span>Submit Guess ({selectedSquares.length})</span>
              </button>
            )}

            {gameState === 'observing' && (
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Memorize the pattern carefully.
              </div>
            )}
          </div>
          {/* --- END CONTROLS --- */}
        </div>


        {/* --- RESULT MODAL (Keeping Emerald/Red for clear feedback) --- */}
        {gameState === 'result' && (() => {
          const title = isCorrect ? (isLastLevel ? 'Challenge Conquered!' : 'Excellent!') : 'Pattern Mismatch';
          const message = isCorrect
            ? isLastLevel ? 'You have successfully completed all levels. Well done!' : `Flawless execution! Move on to Level ${currentLevel + 2}.`
            : `Keep practicing! You correctly identified ${correctSquares.length} out of ${flashingSquares.length} targets.`;
          const icon = isCorrect ? <CheckCircle2 size={24} className="text-emerald-500" /> : <XCircle size={24} className="text-red-500" />;
          const resultButtonBase = 'px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.97] font-inter';

          return (
            <div className={`mt-6 p-4 rounded-xl shadow-lg border-2 ${isCorrect 
                ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/40' 
                : 'border-red-300 bg-red-50 dark:bg-red-900/40'} 
                transition-colors duration-300 font-inter`}>
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {icon}
                  <div>
                    <h3 className={`text-lg font-bold font-alegreya ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'} uppercase`}>
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{message}</p>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  {isCorrect && !isLastLevel && (
                    <button onClick={handleNextLevel} className={`${resultButtonBase} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300`}>
                      <ChevronRight size={14} className="inline mr-1" /> Next
                    </button>
                  )}
                  {(!isCorrect || isLastLevel) && (
                    <button onClick={handleRetry} className={`${resultButtonBase} ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} focus:ring-gray-400`}>
                      <RefreshCw size={12} className="inline mr-1" /> {isCorrect ? 'Restart' : 'Retry'}
                    </button>
                  )}
                  {isLastLevel && isCorrect && (
                    <button onClick={handleNextLevel} className={`${resultButtonBase} bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-300`}>
                      <Zap size={14} className="inline mr-1" /> Finish
                    </button>
                  )}
                </div>
              </div>

              {showHint && !isCorrect && (
                <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-700/50">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-semibold text-xs">
                    <Lightbulb size={14} />
                    <span className="uppercase">Insight:</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 italic">{level.hint}</p>
                </div>
              )}
            </div>
          );
        })()}
        {/* --- END RESULT MODAL --- */}

      </div>
    </div>
  );
};

export default Game;