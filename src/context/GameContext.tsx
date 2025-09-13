'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Player, Question } from '@/types';
import { selectRandomAgents, shuffleArray } from '@/lib/utils';
import questionsData from '@/data/questions.json';

const questions = questionsData as Question[];

interface GameContextType {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

type GameAction =
  | { type: 'INITIALIZE_GAME'; payload: { players: Player[]; settings: { rounds: number; agents: number } } }
  | { type: 'NEXT_PLAYER' }
  | { type: 'NEXT_ROUND' }
  | { type: 'REVEAL_CARD' }
  | { type: 'FINISH_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'UPDATE_SCORE'; payload: { playerId: string; points: number } };

const initialGameState: GameState = {
  currentRound: 0,
  currentPlayerIndex: 0,
  players: [],
  agents: [],
  currentQuestion: undefined,
  gameSettings: { rounds: 10, agents: 1 },
  isGameFinished: false,
  scores: {},
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      const { players, settings } = action.payload;
      const playerIds = players.map((p: Player) => p.id);
      const agents = selectRandomAgents(playerIds, settings.agents);
      const shuffledQuestions = shuffleArray(questions);
      
      return {
        ...state,
        players,
        gameSettings: settings,
        agents,
        currentQuestion: shuffledQuestions[0],
        currentRound: 1,
        currentPlayerIndex: 0,
        isGameFinished: false,
        scores: players.reduce((acc: Record<string, number>, player: Player) => {
          acc[player.id] = 0;
          return acc;
        }, {}),
      };

    case 'NEXT_PLAYER':
      const nextPlayerIndex = state.currentPlayerIndex + 1;
      return {
        ...state,
        currentPlayerIndex: nextPlayerIndex,
      };

    case 'NEXT_ROUND':
      if (state.currentRound >= state.gameSettings.rounds) {
        return {
          ...state,
          isGameFinished: true,
        };
      }
      // Select new random agents for each round
      const nextRoundPlayerIds = state.players.map((p: Player) => p.id);
      const newAgents = selectRandomAgents(nextRoundPlayerIds, state.gameSettings.agents);
      
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentPlayerIndex: 0,
        agents: newAgents, // New random agents each round
        currentQuestion: shuffleArray(questions)[0],
      };

    case 'REVEAL_CARD':
      return {
        ...state,
        // Card is revealed, no state change needed for this action
      };

    case 'FINISH_GAME':
      return {
        ...state,
        isGameFinished: true,
      };

    case 'RESET_GAME':
      return initialGameState;

    case 'RESTART_GAME':
      // Restart the game with the same players and settings
      const currentPlayerIds = state.players.map((p: Player) => p.id);
      const newAgentsForRestart = selectRandomAgents(currentPlayerIds, state.gameSettings.agents);
      const shuffledQuestionsForRestart = shuffleArray(questions);
      
      return {
        ...state,
        agents: newAgentsForRestart,
        currentQuestion: shuffledQuestionsForRestart[0],
        currentRound: 1,
        currentPlayerIndex: 0,
        isGameFinished: false,
        scores: state.players.reduce((acc: Record<string, number>, player: Player) => {
          acc[player.id] = 0;
          return acc;
        }, {}),
      };

    case 'UPDATE_SCORE':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.playerId]: action.payload.points,
        },
      };

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
