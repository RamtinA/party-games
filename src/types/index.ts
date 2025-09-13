export interface Player {
  id: string;
  name: string;
  team?: string;
  points: number;
}

export interface GameSettings {
  rounds: number;
  agents: number;
  [key: string]: string | number; // For future games with different settings
}

export interface Game {
  id: string;
  name: string;
  description: string;
  needsTeams: boolean;
  settings: GameSettings;
}

export interface Question {
  id: string;
  text: {
    en: string;
    fa: string;
  };
  category?: string;
}

export interface GameState {
  currentRound: number;
  currentPlayerIndex: number;
  players: Player[];
  agents: string[]; // Player IDs who are agents
  currentQuestion?: Question;
  gameSettings: GameSettings;
  isGameFinished: boolean;
  scores: { [playerId: string]: number };
}

export interface AppState {
  currentGame: Game | null;
  players: Player[];
  language: 'en' | 'fa';
  isGameActive: boolean;
}
