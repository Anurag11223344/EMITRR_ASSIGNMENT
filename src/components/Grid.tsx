import React from 'react';
import Square from './Square';

interface GridProps {
  flashingSquares: number[];
  selectedSquares: number[];
  correctSquares: number[];
  incorrectSquares: number[];
  onSquareClick: (index: number) => void;
  darkMode: boolean;
  isFlashing: boolean;
  disabled: boolean;
}

const Grid: React.FC<GridProps> = ({
  flashingSquares,
  selectedSquares,
  correctSquares,
  incorrectSquares,
  onSquareClick,
  darkMode,
  isFlashing,
  disabled,
}) => {
  return (
    // Minimal, simple container that holds the grid structure.
    <div
      className="grid gap-3 p-5 rounded-3xl mx-auto transition-colors duration-300 shadow-xl"
      style={{ 
        gridTemplateColumns: `repeat(5, minmax(0, 1fr))`, 
        maxWidth: '400px', 
        // Elegant background treatment using the theme colors
        backgroundColor: darkMode ? '#1f2937' : 'rgba(253, 230, 255, 0.7)', // Soft Fuchsia/Gray background
        boxShadow: darkMode ? '0 15px 30px -10px rgba(0,0,0,0.5)' : '0 10px 20px -5px rgba(139, 92, 246, 0.2)' // Soft professional shadow
      }}
    >
      {Array.from({ length: 25 }, (_, index) => (
        <Square
          key={index}
          index={index}
          isFlashing={isFlashing && flashingSquares.includes(index)}
          isSelected={selectedSquares.includes(index)}
          isCorrect={correctSquares.includes(index)}
          isIncorrect={incorrectSquares.includes(index)}
          onClick={() => onSquareClick(index)}
          darkMode={darkMode}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Grid;
