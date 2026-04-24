'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Density = 'compact' | 'comfortable' | 'spacious';

export const ACCENTS = [
  { name: 'Green', value: '#4ade80' },
  { name: 'Blue',  value: '#60a5fa' },
  { name: 'Cyan',  value: '#22d3ee' },
  { name: 'Amber', value: '#f0a641' },
  { name: 'Pink',  value: '#f472b6' },
  { name: 'White', value: '#e5e4e0' },
] as const;

interface ThemeCtx {
  dark: boolean;
  accent: string;
  density: Density;
  setDark: (v: boolean) => void;
  setAccent: (v: string) => void;
  setDensity: (v: Density) => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

const DEFAULTS = { dark: true, accent: '#4ade80', density: 'comfortable' as Density };
const STORAGE_KEY = 'jreed-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(DEFAULTS.dark);
  const [accent, setAccentState] = useState(DEFAULTS.accent);
  const [density, setDensityState] = useState<Density>(DEFAULTS.density);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      if (typeof saved.dark === 'boolean') setDarkState(saved.dark);
      if (typeof saved.accent === 'string') setAccentState(saved.accent);
      if (['compact', 'comfortable', 'spacious'].includes(saved.density)) setDensityState(saved.density);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--accent', accent);
  }, [dark, accent]);

  const save = (patch: Partial<typeof DEFAULTS>) => {
    const next = { dark, accent, density, ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setDark = (v: boolean)    => { setDarkState(v);    save({ dark: v }); };
  const setAccent = (v: string)   => { setAccentState(v);  save({ accent: v }); };
  const setDensity = (v: Density) => { setDensityState(v); save({ density: v }); };

  return (
    <ThemeContext.Provider value={{ dark, accent, density, setDark, setAccent, setDensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useColors() {
  const { dark, accent, density } = useTheme();
  const bg      = dark ? '#0e0e10' : '#f7f6f3';
  const surface = dark ? '#17171a' : '#ecebe6';
  const ink     = dark ? '#e5e4e0' : '#1a1a1c';
  const mute    = dark ? 'rgba(229,228,224,0.5)'  : 'rgba(26,26,28,0.55)';
  const line    = dark ? 'rgba(229,228,224,0.12)' : 'rgba(26,26,28,0.12)';
  const soft    = dark ? 'rgba(229,228,224,0.04)' : 'rgba(26,26,28,0.035)';
  const pad     = density === 'compact' ? 20 : density === 'spacious' ? 44 : 30;
  const rowh    = density === 'compact' ? 26 : density === 'spacious' ? 38 : 32;
  return { bg, surface, ink, mute, line, soft, accent, pad, rowh, dark, density };
}
