'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useTranslations } from '@/lib/translations';
import { Player } from '@/types';

export function AgentXGame() {
  const { state: appState } = useApp();
  const { gameState, dispatch } = useGame();
  const t = useTranslations(appState.language);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (appState.players.length > 0 && !gameState.players.length) {
      dispatch({
        type: 'INITIALIZE_GAME',
        payload: {
          players: appState.players,
          settings: appState.currentGame?.settings || { rounds: 10, agents: 1 },
        },
      });
    }
  }, [appState.players, gameState.players.length, dispatch, appState.currentGame?.settings]);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isAgent = currentPlayer && gameState.agents.includes(currentPlayer.id);

  const handleRevealCard = () => {
    setIsCardRevealed(true);
  };

  const handleNextPlayer = () => {
    setIsCardRevealed(false);
    dispatch({ type: 'NEXT_PLAYER' });
  };

  const handleFinishRound = () => {
    setShowResults(true);
  };

  const handleAgentWon = (won: boolean) => {
    if (won) {
      // Add points to agents
      gameState.agents.forEach((agentId: string) => {
        dispatch({
          type: 'UPDATE_SCORE',
          payload: { playerId: agentId, points: gameState.scores[agentId] + 1 },
        });
      });
    } else {
      // Add points to non-agents
      gameState.players
        .filter((p: Player) => !gameState.agents.includes(p.id))
        .forEach((player: Player) => {
          dispatch({
            type: 'UPDATE_SCORE',
            payload: { playerId: player.id, points: gameState.scores[player.id] + 1 },
          });
        });
    }

    if (gameState.currentRound >= gameState.gameSettings.rounds) {
      dispatch({ type: 'FINISH_GAME' });
    } else {
      dispatch({ type: 'NEXT_ROUND' });
      setShowResults(false);
    }
  };

  if (gameState.isGameFinished) {
    return (
      <div className="max-w-4xl mx-auto text-center px-4 animate-bounce-in">
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce-in">🎉</div>
          <h2 className="gaming-title text-4xl font-black mb-4">
            {t.gameFinished}
          </h2>
        </div>
        <div className="gaming-card p-8">
          <h3 className="text-2xl font-black text-gray-100 mb-8">
            {t.finalScores}
          </h3>
          <div className="space-y-4">
            {gameState.players
              .sort((a: Player, b: Player) => gameState.scores[b.id] - gameState.scores[a.id])
              .map((player: Player, index: number) => (
                <div key={player.id} className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                      {index + 1}
                    </div>
                    <span className="text-xl font-bold text-gray-100">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                    {gameState.scores[player.id]} {t.points}
                  </span>
                </div>
              ))}
          </div>
          <div className="mt-8">
            <Button 
              onClick={() => dispatch({ type: 'RESTART_GAME' })} 
              size="lg" 
              className="animate-bounce-in"
            >
              {t.playAgain || 'Play Again'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto text-center px-4 animate-bounce-in">
        <div className="gaming-card p-8">
          <div className="text-6xl mb-6 animate-bounce-in">🤔</div>
          <h2 className="gaming-title text-3xl font-black mb-8">
            {t.didAgentsWin}
          </h2>
          <div className="flex gap-6 justify-center">
            <Button onClick={() => handleAgentWon(true)} size="lg" className="animate-bounce-in">
              {t.yes}
            </Button>
            <Button onClick={() => handleAgentWon(false)} size="lg" variant="secondary" className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              {t.no}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Check if all players have seen their cards for this round
  const allPlayersSeen = gameState.currentPlayerIndex >= gameState.players.length;

  if (allPlayersSeen) {
    return (
      <div className="max-w-2xl mx-auto text-center px-4 animate-bounce-in">
        <div className="gaming-card p-8">
          <div className="text-6xl mb-6 animate-bounce-in">✅</div>
          <h2 className="gaming-title text-3xl font-black mb-4">
            {t.roundComplete}
          </h2>
          <p className="text-xl text-gray-100 mb-8 font-medium">
            {t.round} {gameState.currentRound} {t.of} {gameState.gameSettings.rounds}
          </p>
          <Button onClick={handleFinishRound} size="lg" className="animate-bounce-in">
            {t.finishRound}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="gaming-title text-4xl font-black mb-4 animate-bounce-in">
          {t.agentX}
        </h2>
        <div className="gaming-card p-4 max-w-md mx-auto">
          <p className="text-xl text-gray-100 font-bold">
            {t.round} {gameState.currentRound} {t.of} {gameState.gameSettings.rounds}
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <Card
          isRevealed={isCardRevealed}
          className="w-96 h-80 animate-float"
          onClick={!isCardRevealed ? handleRevealCard : undefined}
        >
          <div className="w-full h-full flex items-center justify-center">
            {!isCardRevealed ? (
              <div className="text-center animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-3xl font-black text-white animate-glow">
                  👤
                </div>
                <h3 className="text-3xl font-black text-gray-100 mb-6">
                  {currentPlayer.name}
                </h3>
                <Button onClick={handleRevealCard} size="lg" className="animate-bounce-in">
                  {t.reveal}
                </Button>
              </div>
            ) : (
              <div className="text-center p-8 animate-fade-in">
                {isAgent ? (
                  <div>
                    <div className="text-6xl mb-4 animate-shake">🕵️</div>
                    <h3 className="text-3xl rounded-4xl p-4 bg-gray-200 font-black text-red-600 mb-6 animate-glow">
                      {t.youAreAgentX}
                    </h3>
                    <p className="text-lg text-gray-200 mb-6 font-medium">
                      {t.lieAboutAnswer}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4 animate-bounce-in">❓</div>
                    <h3 className="text-2xl font-black text-gray-100 mb-4">
                      {t.question}
                    </h3>
                    <p className="text-xl text-gray-200 mb-6 font-medium leading-relaxed">
                      {gameState.currentQuestion?.text[appState.language]}
                    </p>
                    <p className="text-lg text-gray-300 font-medium">
                      {t.answerTruthfully}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {isCardRevealed && (
        <div className="text-center">
          <Button onClick={handleNextPlayer} size="lg" className="animate-bounce-in">
            {t.nextPlayer}
          </Button>
        </div>
      )}
    </div>
  );
}
