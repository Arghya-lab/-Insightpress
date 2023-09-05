import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  userEmail: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.name = action.payload.name
      state.userEmail = action.payload.email
      state.token = action.payload.token
    },
  },
})

export const { setAuth, } = authSlice.actions

export default authSlice.reducer