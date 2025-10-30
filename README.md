# 🎯 Pattern Recognition Puzzle Game

A **beautiful, interactive pattern recognition game** built with **React + TypeScript**.  
Test your cognitive abilities by observing flashing patterns on a **5×5 grid** and decoding the **hidden logic** behind each level.

![Game Preview](https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200)

---

## 🧩 Features

### 🎮 Game Mechanics
- 🧠 **10 Progressive Levels** — Each level introduces a unique pattern rule  
- 👀 **Observation Phase** — Watch squares flash for 10 seconds  
- 🕹️ **Guessing Phase** — Select the squares you believe were flashing  
- ⚡ **Instant Feedback** — Correct (🟩) and incorrect (🟥) squares shown instantly  
- 💡 **Hint System** — Get smart hints when you make mistakes  
- 🏆 **Score Tracking** — Earn 100 points per completed level  

### 💎 UI/UX Highlights
- 🌈 **Modern Design** — Gradient backgrounds, smooth transitions, and animations  
- 🌓 **Dark / Light Mode** — Toggle for visual comfort  
- 📱 **Responsive Layout** — Works seamlessly on all devices  
- ✨ **Visual Effects** — Glowing squares, pulse animations, and transitions  
- 🧭 **Intuitive Controls** — Simple, clean interface with clear feedback  
- 📊 **Progress Tracking** — Always see your current level and score  

---

## 🧠 Pattern Rules by Level

| Level | Rule | Description |
|-------|------|-------------|
| 1 | Even Positions | Squares at even indices (0, 2, 4, 6...) |
| 2 | Diagonals | Main and anti-diagonal squares |
| 3 | Prime Numbers | Squares at prime number positions |
| 4 | Center Cluster | Center square and its 4 direct neighbors |
| 5 | Modulo Pattern | Squares where (row + col) % 3 === 0 |
| 6 | Corners & Edges | All border squares |
| 7 | Checkerboard | Alternating pattern like a checkerboard |
| 8 | Fibonacci | Positions in the Fibonacci sequence |
| 9 | Plus Sign | Middle row and column forming a + |
| 10 | Perfect Squares | Positions that are perfect squares (0, 1, 4, 9, 16) |

---

## ⚙️ Tech Stack

- ⚛️ **React 18** — Functional components with Hooks  
- 🟦 **TypeScript** — Type-safe, maintainable codebase  
- ⚡ **Vite** — Ultra-fast development and build tool  
- 🎨 **Tailwind CSS** — Utility-first styling  
- 🔔 **Lucide React** — Crisp and customizable icons  
- 🧰 **Supabase (optional)** — Ready backend for leaderboards or data persistence  

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js **v18+**
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pattern-recognition-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. **Observe** - Watch the grid carefully as certain squares flash for 10 seconds
2. **Remember** - Try to identify the pattern or rule determining which squares flash
3. **Select** - Click on the squares you believe were flashing
4. **Submit** - Click "Submit Answer" to check your solution
5. **Learn** - If incorrect, read the hint to understand the pattern better
6. **Progress** - Complete all 10 levels to master pattern recognition!

## Project Structure

```
src/
├── components/
│   ├── Game.tsx           # Main game component with state management
│   ├── Grid.tsx           # 5×5 grid container
│   ├── Square.tsx         # Individual square with animations
│   ├── LevelInfo.tsx      # Level and score display
│   ├── GameControls.tsx   # Submit and reset buttons
│   └── ResultModal.tsx    # Success/failure feedback modal
├── game/
│   └── levels.ts          # Level definitions and pattern rules
├── App.tsx                # Root component with theme toggle
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Component Architecture

### Game Flow
1. **Game.tsx** - Manages game state, level progression, and timer
2. **Grid.tsx** - Renders the 5×5 grid of squares
3. **Square.tsx** - Individual square with click handling and visual states
4. **ResultModal.tsx** - Shows success/failure feedback and hints

### State Management
- Game states: `observing`, `guessing`, `result`
- Square states: flashing, selected, correct, incorrect
- Level progression and score tracking
- Dark mode preference

### Adjusting Timing

In `Game.tsx`, modify the observation duration:

```typescript
setTimeLeft(10); // Change to desired seconds
```

## Future Enhancements

- Leaderboard system using Supabase
- Sound effects for interactions
- Additional levels with more complex patterns
- Difficulty modes (Easy/Normal/Hard)
- Statistics tracking (accuracy, completion time)
- Social sharing of scores
- Multiplayer challenges

## License

MIT License - Feel free to use this project for learning or building upon it.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
