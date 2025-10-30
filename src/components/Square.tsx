import React, { useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SquareProps {
  index: number;
  isFlashing: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  onClick: () => void;
  darkMode: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({
  index,
  isFlashing,
  isSelected,
  isCorrect,
  isIncorrect,
  onClick,
  darkMode,
  disabled,
}) => {
  // Determine square styling based on state
  const getSquareClasses = useCallback(() => {
    // Base styling: ensures soft rounding, responsiveness, and smooth transitions
    const baseClasses = 'aspect-square w-full h-full text-base rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer select-none font-alegreya font-black border-2 shadow-md';

    // Result State Coloring (Highest priority)
    if (isCorrect) {
      return `${baseClasses} bg-emerald-400 dark:bg-emerald-600 border-emerald-500 shadow-emerald-500/50`;
    }

    if (isIncorrect) {
      return `${baseClasses} bg-rose-400 dark:bg-rose-700 border-rose-500 shadow-rose-500/50 opacity-80`;
    }

    // Flashing State Coloring (Uses Violet accent with a custom pulse)
    if (isFlashing) {
      // NOTE: Tailwind's built-in 'animate-pulse' is used here, but for a true pulse effect 
      // where the box-shadow pulses, a custom keyframe would be better (as used in previous versions 
      // but omitted here for conciseness). We use a strong color here.
      return `${baseClasses} bg-violet-400 text-white border-violet-300 dark:border-violet-600 animate-pulse shadow-violet-400/70`;
    }

    // Guessing State Coloring (When selected by user - uses soft Violet tint)
    if (isSelected) {
      return `${baseClasses} bg-violet-200 dark:bg-violet-700 text-violet-800 dark:text-violet-200 border-violet-400 dark:border-violet-600 ring-2 ring-violet-500 shadow-inner`;
    }

    // Default State (Simple, elegant, and non-blocky)
    return `${baseClasses} ${
      darkMode 
        ? 'bg-gray-800 text-gray-500 hover:bg-gray-700 border-gray-700 shadow-inner' 
        : 'bg-white text-gray-400 hover:bg-gray-100 border-gray-200 shadow-sm'} 
      ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:scale-[1.02] active:scale-[0.98]'}`;
  }, [isCorrect, isIncorrect, isFlashing, isSelected, darkMode, disabled]);


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getSquareClasses()}
      aria-label={`Square ${index + 1}`}
    >
      {/* Show Check/X icons for result state, otherwise show the index number */}
      {isCorrect && <CheckCircle2 className="w-8 h-8 text-white" />}
      {isIncorrect && <XCircle className="w-8 h-8 text-white" />}
      {!isCorrect && !isIncorrect && !isFlashing && (
        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{index + 1}</span>
      )}
    </button>
  );
};

export default Square;
