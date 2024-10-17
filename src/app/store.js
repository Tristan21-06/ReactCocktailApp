import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../features/filter/FilterSlice';
import cocktailReducer from '../features/cocktail/CocktailSlice';

export default configureStore({
    reducer: {
        filter: filterReducer,
        cocktail: cocktailReducer
    }
})