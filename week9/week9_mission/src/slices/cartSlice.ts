import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
