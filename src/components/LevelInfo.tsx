import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface LevelInfoProps {
  level: number;
  totalLevels: number;
  score: number;
  darkMode: boolean;
}

const LevelInfo: React.FC<LevelInfoProps> = ({ level, totalLevels, score, darkMode }) => {
  const cardBaseClasses = `rounded-3xl p-6 transition-colors duration-300 border shadow-md flex justify-between items-center`;

  return (
    <div className={cardBaseClasses}
      style={{
        // Soft, beautiful background and border that avoids the blocky look
        backgroundColor: darkMode ? '#1f2937' : 'rgba(255, 255, 255, 0.9)',
        borderColor: darkMode ? '#374151' : '#f5d0fe', // Soft fuchsia border in light mode
      }}
    >
      {/* Level Info Block */}
      <div className="flex items-center gap-4">
        {/* Adorable Icon with Violet Accent */}
        <Target 
          className="w-7 h-7" 
          style={{ color: darkMode ? '#a78bfa' : '#8b5cf6' }} // Violet-400 / Violet-600
        />
        <div>
          <div className={`text-sm font-alegreya font-normal uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Level Progress
          </div>
          <div className={`text-3xl font-bold font-alegreya ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <span className="text-violet-500">{level}</span> / {totalLevels}
          </div>
        </div>
      </div>

      {/* Score Info Block */}
      <div className="flex items-center gap-4">
        <div>
          <div className={`text-sm font-alegreya font-normal uppercase tracking-wider text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Current Score
          </div>
          {/* Professional Score Display */}
          <div className={`text-3xl font-bold font-alegreya text-right ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {score}
          </div>
        </div>
        {/* Trophy Icon with Yellow Accent */}
        <Trophy 
          className="w-7 h-7" 
          style={{ color: darkMode ? '#facc15' : '#eab308' }} // Yellow-400 / Yellow-600
        />
      </div>
    </div>
  );
};

export default LevelInfo;
