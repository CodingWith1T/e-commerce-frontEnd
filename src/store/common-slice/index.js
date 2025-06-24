import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    featureImageList: [],
}

export const getFeatureImages = createAsyncThunk('/common/getFeatureImages',
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                `https://e-commerce-backend-production-6761.up.railway.app/api/common/feature/get`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const addFeatureImages = createAsyncThunk('/common/addFeatureImages',
    async (image) => {
        try {
            const response = await axios.post(
                `https://e-commerce-backend-production-6761.up.railway.app/api/common/feature/add`,
                { image }
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            })
    },
})

export default commonSlice.reducer;