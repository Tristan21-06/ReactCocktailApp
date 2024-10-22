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
        toggleFavorite: (state, action) => {
            let newMyCocktail = {
                idDrink: action.payload.idDrink,
                strDrink: action.payload.strDrink,
                strDrinkThumb: action.payload.strDrinkThumb,
            };

            if(state.myCocktails.includes(newMyCocktail)) {
                let index = state.myCocktails.indexOf(action.payload);
                state.myCocktails.splice(index, 1)
            } else {
                state.myCocktails.push(action.payload);
            }
        }
    }
});

export const {initializeCocktails, addMyCocktail, toggleFavorite, removeMyCocktail} = cocktailSlice.actions

export default cocktailSlice.reducer
