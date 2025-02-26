// themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') return 'dark';
    return 'light';
}

interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            localStorage.setItem('theme', action.payload);
            document.documentElement.classList.toggle('dark', action.payload === 'dark'); // Aggiungi questa riga
        },
        toggleTheme: (state) => {
            const newTheme = state.mode === 'light' ? 'dark' : 'light';
            state.mode = newTheme;
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Aggiungi questa riga
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
