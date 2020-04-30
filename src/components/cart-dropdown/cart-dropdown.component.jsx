import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = ({ cartItems, history, dispatch }) => (
 <div className="cart-dropdown">
  <div className="cart-items">
   {cartItems.length ? (
    cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)
   ) : (
    <span className="empty-message">Your cart is empty</span>
   )}
  </div>
  <CustomButton
   onClick={() => {
    history.push("/checkout");
    dispatch(toggleCartHidden());
   }}
  >
   GO TO CHECKOUT
  </CustomButton>
 </div>
);

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//  cartItems,
// });

// const mapStateToProps = (state) => ({
//  cartItems: selectCartItems(state),
// });
const mapStateToProps = createStructuredSelector({
 cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropDown));
//connect actually passes the dispatch in our component as a prop if we do not a second parameter into the connect
