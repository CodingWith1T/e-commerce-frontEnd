import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    searchResults: [],
}

export const getSearchResults = createAsyncThunk('/search/getSearchResults',
    async (keyword, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://e-commerce-backend-production-6761.up.railway.app/api/shop/search/${keyword}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
         resetSearchResults : (state) => {
            state.searchResults = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected, (state) => {
                state.isLoading = false;
                state.searchResults = [];
            })
    },
})

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;