// Helper function to check if a number is prime
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export interface Level {
  name: string;
  description: string;
  rule: () => number[];
  hint: string;
}

export const levels: Level[] = [
  {
    name: 'Level 1: Even Positions',
    description: 'Watch carefully and remember the pattern...',
    rule: () => {
      // Flash squares where index % 2 === 0
      return Array.from({ length: 25 }, (_, i) => i).filter((i) => i % 2 === 0);
    },
    hint: 'Look for squares at even positions (0, 2, 4, 6, ...)',
  },
  {
    name: 'Level 2: Diagonals',
    description: 'A new pattern emerges...',
    rule: () => {
      // Flash squares on the main and anti-diagonals
      const squares: number[] = [];
      for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if (row === col || row + col === 4) {
          squares.push(i);
        }
      }
      return squares;
    },
    hint: 'Think about diagonal lines - both from top-left to bottom-right and top-right to bottom-left.',
  },
  {
    name: 'Level 3: Prime Numbers',
    description: 'Mathematics will guide you...',
    rule: () => {
      // Flash squares whose index is a prime number
      return Array.from({ length: 25 }, (_, i) => i).filter((i) => isPrime(i));
    },
    hint: 'Prime numbers are greater than 1 and only divisible by 1 and themselves (2, 3, 5, 7, 11, 13, 17, 19, 23...).',
  },
  {
    name: 'Level 4: Center Cluster',
    description: 'Focus on the heart of the grid...',
    rule: () => {
      // Flash the center square (12) and its 4 direct neighbors
      return [7, 11, 12, 13, 17];
    },
    hint: 'The center square is at position 12. What about its immediate neighbors (up, down, left, right)?',
  },
  {
    name: 'Level 5: Modulo Pattern',
    description: 'A mathematical formula determines this pattern...',
    rule: () => {
      // Flash squares where (row + col) % 3 === 0
      const squares: number[] = [];
      for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if ((row + col) % 3 === 0) {
          squares.push(i);
        }
      }
      return squares;
    },
    hint: 'For each square, add its row number and column number. If the sum is divisible by 3, it flashes.',
  },
  {
    name: 'Level 6: Corners and Edges',
    description: 'Look to the boundaries...',
    rule: () => {
      // Flash all corner and edge squares
      const squares: number[] = [];
      for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if (row === 0 || row === 4 || col === 0 || col === 4) {
          squares.push(i);
        }
      }
      return squares;
    },
    hint: 'The outermost ring of squares forms the border of the grid.',
  },
  {
    name: 'Level 7: Checkerboard',
    description: 'A classic pattern awaits...',
    rule: () => {
      // Flash squares in a checkerboard pattern
      const squares: number[] = [];
      for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if ((row + col) % 2 === 0) {
          squares.push(i);
        }
      }
      return squares;
    },
    hint: 'Think of a checkerboard - alternating squares. If the sum of row and column is even, it flashes.',
  },
  {
    name: 'Level 8: Fibonacci Sequence',
    description: 'Nature\'s favorite numbers...',
    rule: () => {
      // Flash squares at Fibonacci positions (0, 1, 1, 2, 3, 5, 8, 13, 21)
      const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21];
      return fibonacci.filter((n) => n < 25);
    },
    hint: 'The Fibonacci sequence: each number is the sum of the two before it (0, 1, 1, 2, 3, 5, 8, 13, 21...).',
  },
  {
    name: 'Level 9: Plus Sign',
    description: 'Cross patterns in the center...',
    rule: () => {
      // Flash squares forming a plus sign through the center
      const squares: number[] = [];
      const centerRow = 2;
      const centerCol = 2;
      for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        if (row === centerRow || col === centerCol) {
          squares.push(i);
        }
      }
      return squares;
    },
    hint: 'A plus sign crosses through the middle row and middle column.',
  },
  {
    name: 'Level 10: Perfect Squares',
    description: 'The final challenge - mathematical perfection...',
    rule: () => {
      // Flash squares at positions that are perfect squares (0, 1, 4, 9, 16)
      return [0, 1, 4, 9, 16];
    },
    hint: 'Perfect squares are numbers like 0, 1, 4, 9, 16, 25... (0², 1², 2², 3², 4²...).',
  },
];
