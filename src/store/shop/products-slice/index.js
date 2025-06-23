import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    isLoading: false,
    productList: [],
    productDetails : null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',
    async ({filterspParams, sortParams, thunkAPI}) => {
        try {
            const query = new URLSearchParams({
                ...filterspParams,
                sortBy : sortParams,
            })
            const response = await axios.get(
                `http://localhost:8080/api/shop/products/get?${query}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/shop/products/get/${id}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails : (state) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productDetails = null;
            });
    },
})

export const { setProductDetails } = shoppingProductsSlice.actions;

export default shoppingProductsSlice.reducer;