import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import usersReducer from '../slices/usersSlice';
import contextReducer from '../slices/contextSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    context: contextReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
