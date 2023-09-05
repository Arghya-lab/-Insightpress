import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLightMode: true,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.isLightMode = !state.isLightMode
    },
  },
})

export const { changeMode,  } = infoSlice.actions

export default infoSlice.reducer