import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './slices/main'
import invoiceReducer from './slices/invoice'

export const store = configureStore({
  reducer: { main: mainReducer, invoice: invoiceReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
