import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let f = false;
            state.cart = state.cart.map((item) => {
                if (item.pizzaId === action.payload.pizzaId) {
                    f = true;
                    return { ...item, quantity: item.quantity + action.payload.quantity, totalPrice: item.totalPrice + action.payload.totalPrice }
                }
                return item;
            })
            if (!f) {
                state.cart.push(action.payload);
            }
            console.log(state.cart)
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            if (item) {
                item.quantity++;
                item.totalPrice = item.unitPrice * item.quantity;
            }
        },
        decreaseItemQuantity: (state, action) => {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            if (item && item.quantity >1) {
                item.quantity--;
                item.totalPrice = item.unitPrice * item.quantity;
            }
        },
        clearCart(state) {
            state.cart = []
        }

    }
})
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer;