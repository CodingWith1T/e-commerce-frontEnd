import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk('/auth/register',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://e-commerce-backend-production-6761.up.railway.app/api/auth/register",
                formData,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const loginUser = createAsyncThunk('/auth/login',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://e-commerce-backend-production-6761.up.railway.app/api/auth/login",
                formData,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const logoutUser = createAsyncThunk('/auth/logout',
    async (thunkAPI) => {
        try {
            const response = await axios.post(
                "https://e-commerce-backend-production-6761.up.railway.app/api/auth/logout", {},
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                "https://e-commerce-backend-production-6761.up.railway.app/api/auth/check-auth",
                {
                    withCredentials: true,
                    headers: {
                        "Cache-Control":
                            "no-store, no-cache, must-revalidate, proxy-revalidate",
                        Expires: '0',
                    }
                },
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            // state.user = action.payload;
            // state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
