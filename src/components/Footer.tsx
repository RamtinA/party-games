'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslations } from '@/lib/translations';

export function Footer() {
  const { state } = useApp();
  const t = useTranslations(state.language);

  return (
    <footer className="gaming-header py-3">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-gray-200 font-light">
          {t.developedBy}
        </p>
      </div>
    </footer>
  );
}
