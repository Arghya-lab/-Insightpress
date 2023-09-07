import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  id: null,
  userEmail: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.name = action.payload.name
      state.id = action.payload.id
      state.userEmail = action.payload.email
      state.token = action.payload.token
    },
    setLogout: (state) => {      
      state.name = null
      state.id = null
      state.userEmail = null
      state.token = null
    }
  },
})

export const { setAuth, setLogout, } = authSlice.actions

export default authSlice.reducer