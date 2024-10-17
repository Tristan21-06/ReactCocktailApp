import { createSlice } from '@reduxjs/toolkit';

const cocktailSlice = createSlice({
    name : 'cocktail',
    initialState : {
        value : []
    },
    reducers : {
        initializeCocktails : (state, action) => {
            state.value = [
                ...action.payload
            ];
        }
    }
});

export const {initializeCocktails} = cocktailSlice.actions

export default cocktailSlice.reducer
