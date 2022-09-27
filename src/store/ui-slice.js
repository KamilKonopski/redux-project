import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { cartIsVisible: false };

const uiSlice = createSlice({
	name: "ui",
	initialState: cartInitialState,
	reducers: {
		toggleVisible(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
