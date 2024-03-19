import { createSlice } from '@reduxjs/toolkit'

export interface InvoiceState {
  invoiceOpen: boolean;
}

const initialState: InvoiceState = {
  invoiceOpen: false,
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    toggleInvoice: (state) => {
      state.invoiceOpen = !state.invoiceOpen
    },
  },
})
export const { toggleInvoice } = invoiceSlice.actions

export default invoiceSlice.reducer
