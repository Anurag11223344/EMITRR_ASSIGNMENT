import React from 'react';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';

interface ResultModalProps {
  isCorrect: boolean;
  showHint: boolean;
  hint: string;
  onNextLevel: () => void;
  onRetry: () => void;
  darkMode: boolean;
  isLastLevel: boolean;
  correctCount: number;
  totalCount: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isCorrect,
  showHint,
  hint,
  onNextLevel,
  onRetry,
  darkMode,
  isLastLevel,
  correctCount,
  totalCount,
}) => {

  const successColor = isLastLevel ? 'bg-fuchsia-500 hover:bg-fuchsia-600' : 'bg-violet-500 hover:bg-violet-600';
  const errorColor = 'bg-rose-500 hover:bg-rose-600';

  const buttonBase = 'px-8 py-4 rounded-full font-alegreya font-bold text-lg flex items-center gap-3 justify-center mx-auto transition-all duration-300 text-white shadow-xl hover:shadow-2xl';

  return (
    <div className={`rounded-3xl p-8 transition-colors duration-300 mx-auto max-w-lg`}
      style={{
        backgroundColor: darkMode ? '#2d3748' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: darkMode ? '0 10px 30px rgba(167, 139, 250, 0.3)' : '0 10px 30px rgba(139, 92, 246, 0.3)',
        border: darkMode ? '1px solid #4a5568' : '1px solid #f5d0fe'
      }}
    >
      <div className="text-center">
        {isCorrect ? (
          <>
            {/* Success Icon: Soft Green/Violet */}
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#4ade80' }} /> 
            
            <h3 className={`text-4xl font-alegreya font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Perfect! <span className="text-violet-500">🎉</span>
            </h3>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You crushed it! You identified all **{totalCount}** squares correctly.
            </p>
            
            {/* Success Button */}
            <button
              onClick={onNextLevel}
              className={`${buttonBase} ${successColor} ${isLastLevel ? 'shadow-fuchsia-500/40' : 'shadow-violet-500/40'}`}
            >
              {isLastLevel ? 'Complete Game' : 'Next Level'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            {/* Failure Icon: Soft Rose */}
            <XCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#f43f5e' }} /> 
            
            <h3 className={`text-4xl font-alegreya font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Not Quite! <span className="text-rose-500">🤔</span>
            </h3>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You got **{correctCount}** out of **{totalCount}** squares correct. Keep practicing!
            </p>

            {showHint && (
              <div className={`rounded-xl p-4 mb-8 text-left transition-colors duration-300 border-l-4`}
                style={{
                  backgroundColor: darkMode ? 'rgba(88, 28, 135, 0.2)' : 'rgba(139, 92, 246, 0.1)', // Light Violet tint
                  borderColor: '#8b5cf6'
                }}
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 flex-shrink-0" style={{ color: '#8b5cf6' }} />
                  <div>
                    <div className={`font-alegreya font-bold uppercase tracking-wider mb-1 ${
                      darkMode ? 'text-violet-400' : 'text-violet-700'
                    }`}>
                      Hint:
                    </div>
                    <div className={`text-base font-inter ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {hint}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Retry Button */}
            <button
              onClick={onRetry}
              className={`${buttonBase} ${errorColor} shadow-rose-500/40`}
            >
              <RotateCcw className="w-6 h-6" />
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
