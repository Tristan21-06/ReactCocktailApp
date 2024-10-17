import { createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState : {
        value: {}
    },
    reducers: {
        initializeFilters : (state, action) => {
            state.value = {
                ...action.payload
            }
        }
    },
});

export const {initializeFilters} = filterSlice.actions

export default filterSlice.reducer;