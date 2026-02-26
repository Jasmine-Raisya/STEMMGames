import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorSchemeName = 'light' | 'dark';

// ─── Master Palette ─────────────────────────────────────────────────────────

export const COLORS = {
    light: {
        background: '#F8F9FA',
        surface: '#FFFFFF',
        primary: '#2E5E4E',
        accent: '#C44536',
        text: '#2D3E40',
        textMuted: 'rgba(45, 62, 64, 0.6)',
        border: '#E2E6E8',
        // Categories
        engineering: '#2E5E4E',
        health: '#8AA9A6',
        science: '#C44536',
        arts: '#8B5CF6',
        medicine: '#8AA9A6',
        reaction: '#C44536',
        jade: '#3F7863',
        gold: '#F59E0B',
        silver: '#94A3B8',
        bronze: '#B45309',
    },
    dark: {
        background: '#1A1C1E',
        surface: '#2C2E33',
        primary: '#6B9080',
        accent: '#E67A5A',
        text: '#F0F4F4',
        textMuted: 'rgba(240, 244, 244, 0.6)',
        border: '#3E4248',
        // Categories (brightened for dark mode)
        engineering: '#99B9AD', // Lighter sage
        health: '#B5CECB',      // Lighter mint
        science: '#E67A5A',     // Lighter red/orange
        arts: '#A78BFA',        // Lighter violet
        medicine: '#B5CECB',
        reaction: '#E67A5A',
        jade: '#52A68C',        // Brighter emerald
        gold: '#FBBF24',
        silver: '#CBD5E1',
        bronze: '#D97706',
    }
} as const;

// ─── Theme Context ──────────────────────────────────────────────────────────

export interface ThemeContextValue {
    scheme: ColorSchemeName;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
    scheme: 'light',
    themeMode: 'system',
    setThemeMode: () => { },
});

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePorcelainTheme(): ThemeContextValue {
    return useContext(ThemeContext);
}
