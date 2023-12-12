import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../features/data/dataSlice'
import mediaTypeReducer from '../features/data/mediaTypeSlice'
import {apiSlice} from '../features/data/apiSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    mediaType: mediaTypeReducer,
    apiPopular: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})