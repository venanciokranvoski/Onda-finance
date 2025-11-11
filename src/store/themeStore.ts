import { create } from "zustand";
import {theme, darkTheme } from '@theme';

export type ThemeMode = "light" | "dark";

interface ThemeState {
    themeMode: ThemeMode
    theme: typeof theme
    toggleThemeOnda: ()=> void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    themeMode: 'light',
    theme,
    toggleThemeOnda: ()=> {
        const current = get().themeMode
        const newMode = current === 'light' ? 'dark' : 'light'
        set({
            themeMode: newMode,
            theme: newMode === 'dark' ? darkTheme : theme
        }) 
    }
}));
