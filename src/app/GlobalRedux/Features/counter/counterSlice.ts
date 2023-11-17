"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: [];
}

const initialState = {
  products: [],
  filteredProducts: [],
  cart: [],
};

export const counterSlice = createSlice({
  name: "reduxProducts",
  initialState: initialState,
  reducers: {
    addProduct: (state: any, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    addFilter: (state: any, action) => {
      state.filteredProducts = action.payload;
    },
    resetFilters: (state) => {
      state.filteredProducts = [...state.products];
    },
    addCart: (state: any, action) => {
      let item = { ...action.payload };
      const isItemAvl = state.cart.findIndex((ele: any) => ele.id === item.id);
      let tempItem = [] as any;

      if (isItemAvl > -1) {
        if (state.cart[isItemAvl].cartQty + 1 > state.cart[isItemAvl].quantity) {
          tempItem = [...state.cart];
          window.alert("Maximum quantity reached.");
        } else {
          tempItem = [...state.cart];
          tempItem[isItemAvl].cartQty += 1;
        }
      } else {
        item["cartQty"] = 1;
        tempItem = [...state.cart, item];
      }

      state.cart = tempItem;
    },
    removeQuantity: (state: any, action) => {
      let item = { ...action.payload };
      const isItemAvl = state.cart.findIndex((ele: any) => ele.id === item.id);

      let tempItem = [...state.cart];
      if (item.cartQty === 1) {
        tempItem.splice(isItemAvl, 1);
      } else {
        tempItem[isItemAvl].cartQty -= 1;
      }
      state.cart = tempItem;
    },
    removeCartItem: (state: any, action) => {
      let item = { ...action.payload };
      const isItemAvl = state.cart.findIndex((ele: any) => ele.id === item.id);

      let tempItem = [...state.cart];
      tempItem.splice(isItemAvl, 1);

      state.cart = tempItem;
    },
  },
});

export const { addProduct, addCart, removeQuantity, removeCartItem, addFilter, resetFilters } = counterSlice.actions;
export default counterSlice.reducer;
