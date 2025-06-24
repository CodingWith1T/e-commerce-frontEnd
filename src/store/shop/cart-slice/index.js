import axios from "axios";

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    cartItems: {},
    isLoading: false
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async ({ userId, productId, quantity }) => {
        try {
            const response = await axios.post(
                `https://e-commerce-backend-production-6761.up.railway.app/api/shop/cart/add`,
                {
                    userId,
                    productId,
                    quantity,
                }
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCartItem = createAsyncThunk('cart/fetchCartItem',
    async (userId) => {
        try {
            const response = await axios.get(
                `https://e-commerce-backend-production-6761.up.railway.app/api/shop/cart/get/${userId}`
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCartItem = createAsyncThunk('cart/updateCartItem',
    async ({ userId, productId, quantity }) => {
        try {
            const response = await axios.put(
                `https://e-commerce-backend-production-6761.up.railway.app/api/shop/cart/update-cart`,
                {
                    userId,
                    productId,
                    quantity,
                }
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem',
    async ({ userId, productId }) => {
        try {
            const response = await axios.delete(
                `https://e-commerce-backend-production-6761.up.railway.app/api/shop/cart/${userId}/${productId}`
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(fetchCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
    }
})

export default shoppingCartSlice.reducer;