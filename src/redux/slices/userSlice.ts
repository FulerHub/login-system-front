import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import AuthService from "../../services/AuthService";
import {AuthResponse} from "../../helpers/types";
/*import {NotesType} from "../../helpers/types";*/

interface userState {
    isAuth: boolean;
    account: any;
    isLoading: boolean;
    error: string
}

const initialState: userState = {
    isAuth: false,
    account: {},
    isLoading: false,
    error: ''
};


export const asyncLoginAction = createAsyncThunk(
    'account/login',
    async (user:any, thunkAPI)=>{
        try {
            const {email,password} = user;
            let response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncRegisterAction = createAsyncThunk(
    'account/register',
    async (user:any, thunkAPI)=>{
        try {
            const {email,password} = user;
            let response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncCheckAuthAction = createAsyncThunk(
    'account/checkAuth',
    async (_, thunkAPI)=>{
        try {
            const response = await AuthService.checkAuth();
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e:any) {
            localStorage.removeItem('token');
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);

export const asyncLogoutAction = createAsyncThunk(
    'account/logout',
    async (_, thunkAPI)=>{
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            return {};
        } catch (e:any) {
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
);
const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{},
    extraReducers: {
        [asyncLoginAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
            state.account = action.payload;
        },
        [asyncLoginAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncLoginAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },


        [asyncRegisterAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
            state.account = action.payload;
        },
        [asyncRegisterAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncRegisterAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },


        [asyncCheckAuthAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = '';
            state.account = action.payload;
        },
        [asyncCheckAuthAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncCheckAuthAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [asyncLogoutAction.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = '';
            state.account = action.payload;
        },
        [asyncLogoutAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [asyncLogoutAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {} = userSlice.actions;
export default userSlice.reducer;