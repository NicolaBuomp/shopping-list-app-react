import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingList, ShoppingListState } from '../../../types/shoppingList.types';

const initialState: ShoppingListState = {
    lists: [],
    currentList: null,
    loading: false,
    error: null,
};

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        setLists: (state, action: PayloadAction<ShoppingList[]>) => {
            state.lists = action.payload;
        },
        setCurrentList: (state, action: PayloadAction<ShoppingList>) => {
            state.currentList = action.payload;
        },
        addList: (state, action: PayloadAction<ShoppingList>) => {
            state.lists.push(action.payload);
        },
        updateList: (state, action: PayloadAction<ShoppingList>) => {
            const index = state.lists.findIndex(list => list.id === action.payload.id);
            if (index !== -1) {
                state.lists[index] = action.payload;
                if (state.currentList?.id === action.payload.id) {
                    state.currentList = action.payload;
                }
            }
        },
        deleteList: (state, action: PayloadAction<string>) => {
            state.lists = state.lists.filter(list => list.id !== action.payload);
            if (state.currentList?.id === action.payload) {
                state.currentList = null;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setLists,
    setCurrentList,
    addList,
    updateList,
    deleteList,
    setLoading,
    setError,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;