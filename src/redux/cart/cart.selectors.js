import { createSelector } from "reselect";

const selectCart = (state) => state.cart; //Input selector

export const selectCartItems = createSelector(
 [selectCart],
 (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
 [selectCartItems],
 (cartItems) =>
  cartItems.reduce(
   (accumulator, nextValue) => accumulator + nextValue.quantity,
   0
  )
);
