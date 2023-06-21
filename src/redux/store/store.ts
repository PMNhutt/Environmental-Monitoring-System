import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import contextReducer from '../slices/contextSlice';
import nodeSensorReducer from '../slices/loraDataSlice';
import nodeReducer from '../slices/nodeSlice';
import usersReducer from '../slices/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    context: contextReducer,
    nodes: nodeReducer,
    nodeSensors: nodeSensorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
