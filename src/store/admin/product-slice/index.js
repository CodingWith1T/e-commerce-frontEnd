import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: []
}

export const addProduct = createAsyncThunk('/products/addProduct',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/admin/products/add`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/admin/products/getAll");
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchProductById = createAsyncThunk('/products/productById',
    async ({id, thunkAPI}) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/admin/products/getByID/${id}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const editProduct = createAsyncThunk('/products/editProduct',
    async ({id, formData, thunkAPI}) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/admin/products/edit/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/admin/products/delete/${id}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    },
});

export default AdminProductsSlice.reducer;