'use client';

import { AppProvider } from '@/context/AppContext';
import { GameProvider } from '@/context/GameContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/components/HomePage';
import { SettingsPage } from '@/components/SettingsPage';
import { AgentXGame } from '@/components/games/AgentXGame';
import { useApp } from '@/context/AppContext';

function AppContent() {
  const { state } = useApp();

  if (state.isGameActive && state.currentGame?.id === 'agent-x') {
    return <AgentXGame />;
  }

  if (state.currentGame && !state.isGameActive) {
    return <SettingsPage />;
  }

  return <HomePage />;
}

export default function Home() {
  return (
    <AppProvider>
      <GameProvider>
        <Layout>
          <AppContent />
        </Layout>
      </GameProvider>
    </AppProvider>
  );
}
