import { createSlice } from '@reduxjs/toolkit';
import bookItems from '../../bookItems';

//　Define the initial value of the shopping cart
const initialState = {
    bookItems: bookItems, // changed from 'bookItem' to 'bookItems'
    amount: 4,
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            return { bookItems: [], amount: 0, total: 0 };
        },
        removeItem: (state, action) => {
            const bookId = action.payload;
            state.bookItems = state.bookItems.filter(
                (book) => book.id !== bookId
            );
        },
        increase: (state, action) => {
            const cartItem = state.bookItems.find(
                (book) => book.id === action.payload
            );
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, action) => {
            const cartItem = state.bookItems.find(
                (book) => book.id === action.payload
            );
            if (cartItem.amount > 1) {
                cartItem.amount = cartItem.amount - 1;
            }
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.bookItems.forEach((book) => {
                amount += book.amount;
                total += book.amount * book.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
});



export const { clearCart, removeItem, increase, decrease, calculateTotals } =
    cartSlice.actions;
export default cartSlice.reducer;