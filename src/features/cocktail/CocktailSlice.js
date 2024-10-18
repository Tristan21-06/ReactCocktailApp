import { createSlice } from '@reduxjs/toolkit';

const cocktailSlice = createSlice({
    name : 'cocktail',
    initialState : {
        list : [],
        myCocktails : []
    },
    reducers : {
        initializeCocktails : (state, action) => {
            state.list = [
                ...action.payload
            ];
        },
        addMyCocktail: (state, action) => {
            state.myCocktails.push(action.payload);
        },
        removeMyCocktail: (state, action) => {
            let index = state.myCocktails.indexOf(action.payload);
            state.myCocktails.splice(index, 1)
        }
    }
});

export const {initializeCocktails, addMyCocktail, removeMyCocktail} = cocktailSlice.actions

export default cocktailSlice.reducer
