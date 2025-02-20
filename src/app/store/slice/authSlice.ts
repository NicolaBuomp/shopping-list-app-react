// src/app/store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                return thunkAPI.rejectWithValue(data.message || 'Credenziali non valide');
            }

            return data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const signupAsync = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                return thunkAPI.rejectWithValue(data.message || 'Errore registrazione');
            }

            return data; // => { user: {id, name, email}, token, ... }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token'); // eventuale rimozione token
        },
    },
    extraReducers: (builder) => {
        // loginAsync
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;

                // In base alla tua risposta, potrebbe essere:
                // action.payload.user, action.payload.token, ecc.
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token); // se vuoi salvare un token
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // signupAsync
        builder
            .addCase(signupAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // Spesso, dopo il signup, ottieni user+token
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
