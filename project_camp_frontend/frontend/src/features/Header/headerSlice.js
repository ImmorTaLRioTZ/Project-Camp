import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Define the Async Thunk for your fetch operation
export const checkAuth = createAsyncThunk(
    "headerVariables/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/auth/current-user", {
                method: "POST",
                credentials: "include"
            });
            
            if (response.ok) {
                const data = await response.json();
                return data; // This becomes the 'action.payload'
            } else {
                return rejectWithValue("Not Authenticated"); 
            }
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.message);
        }
    }
);

// 2. Define a clean initial state
const initialState = {
    isAuth: false,
    userData: {},
    isLoading: true
};

export const headerSlice = createSlice({
    name: "headerVariables",
    initialState,
    reducers: {
        // 1. Add this new synchronous action!
        setAuthSuccess: (state, action) => {
            state.isAuth = true;
            state.userData = action.payload; // Pass in the user data if your login route returns it
        }
    },    
    // 3. Listen to the async thunk lifecycle
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.userData = action.payload; // The data we returned from the thunk
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.userData = {};
            });
    }
});

export const { setAuthSuccess } = headerSlice.actions;

export default headerSlice.reducer;