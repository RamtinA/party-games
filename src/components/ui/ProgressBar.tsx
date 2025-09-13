import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between text-lg font-light text-gray-400 mb-4">
        <span>Step {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-300 backdrop-blur-sm rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
