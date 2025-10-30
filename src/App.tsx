import React, { useState } from 'react';
import Game from './components/Game'; 
import { Lightbulb, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Note: The Game component is imported but the mock data and levels 
  // needed for it to run independently in an environment are missing. 
  // Assuming those files are available in a real setup.
  
  return (
    // Updated background colors to use the new slate theme for a cleaner look
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8 pt-4">
          <div className="flex items-center gap-3">
            {/* Updated Lightbulb icon color to match the new Indigo theme */}
            <Lightbulb className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ fontFamily: '"Alegreya Sans SC", sans-serif' }}>
              Pattern Recognition
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 text-sm shadow-md ${
              darkMode
                // Updated dark mode button text color to indigo-300
                ? 'bg-slate-700 text-indigo-300 hover:bg-slate-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden sm:inline">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>
        {/* The Game component is placed here and receives the controlled dark mode state */}
        <Game darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
