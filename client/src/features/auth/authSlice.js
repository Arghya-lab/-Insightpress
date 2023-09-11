import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.token = action.payload.token
    },
    setLogout: (state) => {      
      state.id = null
      state.name = null
      state.token = null
    }
  },
})

export const { setAuth, setLogout, } = authSlice.actions

export default authSlice.reducer