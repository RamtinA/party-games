'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Player, Game } from '@/types';
import { generateId } from '@/lib/utils';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'fa' }
  | { type: 'SET_CURRENT_GAME'; payload: Game | null }
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'REMOVE_PLAYER'; payload: string }
  | { type: 'UPDATE_PLAYER'; payload: { id: string; name: string } }
  | { type: 'SET_GAME_ACTIVE'; payload: boolean }
  | { type: 'RESET_GAME' };

const initialState: AppState = {
  currentGame: null,
  players: [],
  language: 'en',
  isGameActive: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_CURRENT_GAME':
      return { ...state, currentGame: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'ADD_PLAYER':
      return { ...state, players: [...state.players, action.payload] };
    case 'REMOVE_PLAYER':
      return { ...state, players: state.players.filter(p => p.id !== action.payload) };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map(p =>
          p.id === action.payload.id
            ? { ...p, name: action.payload.name }
            : p
        ),
      };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.payload };
    case 'RESET_GAME':
      return {
        ...state,
        currentGame: null,
        players: [],
        isGameActive: false,
      };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helper functions
export function createPlayer(name: string, team?: string): Player {
  return {
    id: generateId(),
    name,
    team,
    points: 0,
  };
}
