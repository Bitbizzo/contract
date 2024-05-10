import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserInLocalStorage: (state, action) => {
      state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
          toast.success('login successful')
    },
    removeUserFromLocalStorage: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('logged out successfully')
    },
  },
});

export const { storeUserInLocalStorage, removeUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;