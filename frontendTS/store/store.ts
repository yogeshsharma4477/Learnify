import { PersonSlice } from './slice/courses'
import { configureStore } from '@reduxjs/toolkit'

  export const store = configureStore({
    reducer: { 
      person : PersonSlice
    },
  })