import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  gameState: 'observing' | 'guessing' | 'result';
  onSubmit: () => void;
  onReset: () => void;
  darkMode: boolean;
  selectedCount: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onSubmit,
  onReset,
  darkMode,
  selectedCount,
}) => {
  // Base styling for all buttons
  const baseClass = 'px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-xl active:scale-[0.98] focus:outline-none focus:ring-4 text-sm uppercase tracking-wide font-alegreya';

  const submitClass =
    gameState === 'guessing' && selectedCount > 0
      ? 'bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-300 shadow-violet-500/50'
      : darkMode
      ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-inner'
      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-inner';

  const resetClass = darkMode
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 shadow-gray-600/50'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 shadow-gray-300/50';

  return (
    <div className="flex gap-4 justify-center mt-8">
      <button
        onClick={onSubmit}
        disabled={gameState !== 'guessing' || selectedCount === 0}
        className={`${baseClass} ${submitClass}`}
      >
        <CheckCircle2 className="w-5 h-5" />
        Submit Answer
        {gameState === 'guessing' && selectedCount > 0 && ` (${selectedCount})`}
      </button>

      <button
        onClick={onReset}
        className={`${baseClass} ${resetClass}`}
      >
        <RotateCcw className="w-5 h-5" />
        Reset Game
      </button>
    </div>
  );
};

export default GameControls;
