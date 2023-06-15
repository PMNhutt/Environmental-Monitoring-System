/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instances from 'src/utils/plugins/axios';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { UsersProps } from 'src/utils/interface';

interface initialStateType {
  currentUser: UsersProps;
  loading: boolean;
  error: string;
}

const initialState: initialStateType = {
  currentUser: {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    phone: '',
    role: '',
    isDeleted: false,
    avatar: '',
  },
  loading: false,
  error: '',
};

export const fetchLogin = createAsyncThunk('auth/login', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post('/user/login', req);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchRegister = createAsyncThunk('auth/register', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post('/user/register', req);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const forgotPass = createAsyncThunk('auth/forgotPass', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post('/user/sendResetPasscode', {
      email: req.email,
    });
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const resetPass = createAsyncThunk('auth/resetPass', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post('/user/resetPasscode', req);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentUser = jwt_decode(action.payload.token);
        sessionStorage.setItem('accessToken', action.payload.token);
        toast.success('Login succussfully! 👌');
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentUser = jwt_decode(action.payload.token);
        sessionStorage.setItem('accessToken', action.payload.token);
        toast.success('Register succussfully! 👌');
        state.loading = false;
      })
      .addCase(fetchRegister.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(forgotPass.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPass.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(resetPass.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(resetPass.fulfilled, (state) => {
        toast.success('Reset password succussfully! 👌');
        state.loading = false;
      })
      .addCase(resetPass.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      });
  },
});
export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
