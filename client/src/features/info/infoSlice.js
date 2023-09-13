import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLightMode: true,
  isSlideOpen: false,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.isLightMode = !state.isLightMode
    },
    toggleSlide: (state) => {
      state.isSlideOpen = !state.isSlideOpen
    },
  },
})

export const { changeMode, toggleSlide } = infoSlice.actions

export default infoSlice.reducer