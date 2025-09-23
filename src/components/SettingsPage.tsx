"use client";

import React, { useState } from "react";
// Validation helper
function validateSettings({ players, gameSettings }: { players: { id: string; name: string }[]; gameSettings: { rounds: number | string; agents: number | string } }) {
  const errors: Record<string, string> = {};
  // Player name required
  if (players.some((p) => !p.name.trim())) {
    errors.players = "All player names are required.";
  }
  // At least two players
  if (players.length < 2) {
    errors.playersCount = "At least two players are required.";
  }
  // Rounds > 0
  const rounds = Number(gameSettings.rounds);
  if (!rounds || isNaN(rounds) || rounds <= 0) {
    errors.rounds = "Rounds must be greater than 0.";
  }
  // Agents >= 1 and < players
  const agents = Number(gameSettings.agents);
  if (!agents || isNaN(agents) || agents < 1) {
    errors.agents = "There must be at least one agent.";
  } else if (agents >= players.length) {
    errors.agents = "Agents must be less than number of players.";
  }
  return errors;
}
import { useApp } from "@/context/AppContext";
import { useGame } from "@/context/GameContext";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ProgressBar } from "./ui/ProgressBar";
import { createPlayer } from "@/context/AppContext";
import { useTranslations } from "@/lib/translations";

type SettingsStep = "info" | "players" | "game-settings";

export function SettingsPage() {
  const { state, dispatch } = useApp();
  const { dispatch: gameDispatch } = useGame();
  const t = useTranslations(state.language);
  const [currentStep, setCurrentStep] = useState<SettingsStep>("info");
  const [players, setPlayers] = useState([
    { id: "1", name: `${t.player} 1` },
    { id: "2", name: `${t.player} 2` },
    { id: "3", name: `${t.player} 3` },
  ]);
  const [gameSettings, setGameSettings] = useState<{ rounds: number | ''; agents: number | '' }>({
    rounds: 10,
    agents: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = ["info", "players", "game-settings"];
  const currentStepIndex = steps.indexOf(currentStep) + 1;

  const handlePlayerNameChange = (id: string, name: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    const newId = (players.length + 1).toString();
    setPlayers((prev) => [
      ...prev,
      { id: newId, name: `${t.player} ${players.length + 1}` },
    ]);
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers((prev) => prev.filter((p) => p.id !== id));
    }
  };


  const handleNext = () => {
    if (currentStep === "info") {
      setCurrentStep("players");
      setErrors({});
    } else if (currentStep === "players") {
      // Validate player names and count
      const stepErrors = validateSettings({ players, gameSettings });
      if (stepErrors.players || stepErrors.playersCount) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setCurrentStep("game-settings");
    }
  };

  const handlePlay = () => {
    // Validate all settings
    const stepErrors = validateSettings({ players, gameSettings });
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    // Convert players to the proper format and dispatch
    const formattedPlayers = players.map((p) => createPlayer(p.name));
    dispatch({ type: "SET_PLAYERS", payload: formattedPlayers });
    dispatch({ type: "SET_GAME_ACTIVE", payload: true });
    // Ensure rounds and agents are numbers
    const safeSettings = {
      rounds: typeof gameSettings.rounds === 'number' ? gameSettings.rounds : 1,
      agents: typeof gameSettings.agents === 'number' ? gameSettings.agents : 1,
    };
    // Initialize the game with players and settings
    gameDispatch({
      type: "INITIALIZE_GAME",
      payload: {
        players: formattedPlayers,
        settings: safeSettings,
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "info":
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="gaming-title text-3xl font-black mb-8 text-center">
              {t.gameInformation}
            </h2>
            <div className="gaming-card p-8 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-3xl font-black text-white animate-glow">
                  🕵️
                </div>
                <h3 className="text-2xl font-black text-gray-100 mb-4">
                  {state.currentGame?.name}
                </h3>
              </div>
              <p className="text-gray-100 leading-relaxed text-center">
                {state.currentGame?.description}
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={handleNext}
                size="lg"
                className="animate-bounce-in"
              >
                {t.undrestood}
              </Button>
            </div>
          </div>
        );

      case "players":
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="gaming-title text-3xl font-black mb-8 text-center text-gray-300">
              {t.players}
            </h2>
            <div className="gaming-card p-8">
              <div className="space-y-6">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-4 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center text-white font-bold text-md">
                      {index + 1}
                    </div>
                    <Input
                      value={player.name}
                      onChange={(e) =>
                        handlePlayerNameChange(player.id, e.target.value)
                      }
                      placeholder={`${t.player} ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={players.length <= 2}
                      onClick={() => removePlayer(player.id)}
                      className="w-12 h-12 rounded-xl text-gray-100"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addPlayer}
                  className="w-full animate-bounce-in text-gray-100"
                >
                  {t.addPlayer}
                </Button>
                {errors.players && (
                  <div className="text-red-400 text-sm mt-2">{errors.players}</div>
                )}
                {errors.playersCount && (
                  <div className="text-red-400 text-sm mt-2">{errors.playersCount}</div>
                )}
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button
                onClick={handleNext}
                size="lg"
                className="animate-bounce-in"
              >
                {t.next}
              </Button>
            </div>
          </div>
        );

      case "game-settings":
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="gaming-title text-3xl font-black mb-8 text-center">
              {t.gameSettings}
            </h2>
            <div className="gaming-card p-8 space-y-8">
              <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-lg font-bold text-gray-100 mb-2">
                        {t.numberOfRounds}
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        value={gameSettings.rounds === 0 ? '' : gameSettings.rounds}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGameSettings((prev) => ({
                            ...prev,
                            rounds: val === '' ? '' : parseInt(val) || 0,
                          }));
                        }}
                        className="text-center text-lg font-bold"
                      />
                      {errors.rounds && (
                        <div className="text-red-400 text-sm mt-2">{errors.rounds}</div>
                      )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-lg font-bold text-gray-100 mb-2">
                      {t.numberOfAgents}
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max={players.length - 1}
                      value={gameSettings.agents === 0 ? '' : gameSettings.agents}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGameSettings((prev) => ({
                          ...prev,
                          agents: val === '' ? '' : parseInt(val) || 0,
                        }));
                      }}
                      className="text-center text-lg font-bold"
                    />
                    {errors.agents && (
                      <div className="text-red-400 text-sm mt-2">{errors.agents}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button
                onClick={handlePlay}
                size="lg"
                className="animate-bounce-in"
              >
                {t.playGame}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <ProgressBar current={currentStepIndex} total={steps.length} />
      </div>
      {renderStepContent()}
    </div>
  );
}
