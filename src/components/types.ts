export type GameMode = 'numbers' | 'colors';

export interface GameProps {
  onGameOver: (score: number) => void;
}

export const COLORS = [
  'red', 'blue', 'green', 'yellow', 'purple', 
  'orange', 'pink', 'cyan', 'brown', 'teal',
  'indigo', 'violet', 'magenta', 'lime', 'maroon'
]; 