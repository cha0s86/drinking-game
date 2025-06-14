export interface Task {
  id: number;
  description: string;
  type: 'universal' | 'gender-specific' | 'custom';
}

export interface Player {
  id: string;
  name: string;
  gender: 'male' | 'female';
  isAlive: boolean;
  isBitch?: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayer?: Player;
  currentTask?: Task;
  round: number;
}