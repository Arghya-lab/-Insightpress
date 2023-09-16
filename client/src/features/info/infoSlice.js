import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLightMode: true,
  isSlideOpen: false,
  isModalOpen: false,
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
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
})

export const { changeMode, openSlide, closeSlide, openModal, closeModal, } = infoSlice.actions

export default infoSlice.reducer