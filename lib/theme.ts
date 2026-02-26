import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorSchemeName = 'light' | 'dark';

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
