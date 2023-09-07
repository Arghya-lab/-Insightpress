import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.name = action.payload.name
      state.token = action.payload.token
    },
    setLogout: (state) => {      
      state.name = null
      state.token = null
    }
  },
})

export const { setAuth, setLogout, } = authSlice.actions

export default authSlice.reducer