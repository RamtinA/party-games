'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Game } from '@/types';
import { t, Language } from '@/lib/i18n';

export function HomePage() {
  const { state, dispatch } = useApp();
  const lang = state.language as Language;

  const games: Game[] = [
    {
      id: 'agent-x',
      name: t(lang, 'agentX.name'),
      description: t(lang, 'agentX.description'),
      needsTeams: false,
      settings: {
        rounds: 10,
        agents: 1,
      },
    },
    // More games can be added here in the future
  ];

  const handleGameSelect = (game: Game) => {
    dispatch({ type: 'SET_CURRENT_GAME', payload: game });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-xl text-white font-medium animate-fade-in">
          {t(lang, 'home.welcomeSubtitle')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <Card
            key={game.id}
            className="p-8 animate-slide-in hover:animate-float"
            onClick={() => handleGameSelect(game)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-t from-gray-300 to-gray-200 rounded-2xl flex items-center justify-center text-4xl font-black text-white animate-glow">
                 🕵️
                </div>
                <h3 className="text-2xl font-black text-gray-100 mb-4">
                  {game.name}
                </h3>
              </div>
              <p className="text-gray-100 text-sm mb-6 line-clamp-3 leading-relaxed">
                {game.description}
              </p>
              <Button className="w-full animate-bounce-in" style={{ animationDelay: `${index * 0.2 + 0.5}s` }}>
                {t(lang, 'playGame')}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-16">
          <div className="gaming-card p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-600 font-medium">
              {t(lang, 'home.noGamesAvailable')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
