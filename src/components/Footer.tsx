'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { t, Language } from '@/lib/i18n';

export function Footer() {
  const { state } = useApp();
  const lang = state.language as Language;

  return (
    <footer className="gaming-header py-3">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-gray-200 font-light">
          {t(lang, 'developedBy')}
        </p>
      </div>
    </footer>
  );
}
