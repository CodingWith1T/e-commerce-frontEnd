import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    addressList: {},
    isLoading: false
}

export const addAddress = createAsyncThunk('address/addAddress',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/shop/address/add`,
                formData
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAddress = createAsyncThunk('address/fetchAddress',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/shop/address/get/${userId}`
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const editAddress = createAsyncThunk('address/editAddress',
    async ({ userId, addressID, formData }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/shop/address/update/${userId}/${addressID}`,
                formData,
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteAddress = createAsyncThunk('address/deleteAddress',
    async ({ userId, addressId }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/shop/address/delete/${userId}/${addressId}`
            );
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const userAddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
             
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
         
            })
            .addCase(fetchAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(editAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(editAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
    }
})

export default userAddressSlice.reducer;