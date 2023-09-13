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
    openSlide: (state) => {
      state.isSlideOpen = true
    },
    closeSlide: (state) => {
      state.isSlideOpen = false
    },
  },
})

export const { changeMode, openSlide ,closeSlide } = infoSlice.actions

export default infoSlice.reducer