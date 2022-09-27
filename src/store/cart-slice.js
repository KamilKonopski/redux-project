import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
	name: "cart",
	initialState: cartInitialState,
	reducers: {
		addItemtoCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.name,
				});
			} else {
				existingItem.quantity = existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart() {},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
