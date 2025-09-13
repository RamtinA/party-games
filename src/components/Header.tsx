'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from '@/lib/translations';

export function Header() {
  const { state, dispatch } = useApp();
  const t = useTranslations(state.language);

  const toggleLanguage = () => {
    dispatch({
      type: 'SET_LANGUAGE',
      payload: state.language === 'en' ? 'fa' : 'en',
    });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <header className="gaming-header">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 
            className="text-white font-bold gaming-title text-4xl cursor-pointer hover:scale-105 transition-all duration-300 animate-bounce-in"
            onClick={resetGame}
          >
            {t.partyGames}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-t from-red-700 to-red-600 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t.languageToggle}
          </button>
        </div>
      </div>
    </header>
  );
}
