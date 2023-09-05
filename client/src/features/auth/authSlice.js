import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userEmail: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userEmail = action.payload.mail
      state.token = action.payload.token
    },
  },
})

export const { setAuth, } = authSlice.actions

export default authSlice.reducer