import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = ({ cartItems }) => (
 <div className="cart-dropdown">
  <div className="cart-items">
   {cartItems.map((cartItem) => (
    <CartItem key={cartItem.id} item={cartItem} />
   ))}
  </div>
  <CustomButton>GO TO CHECKOUT</CustomButton>
 </div>
);

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//  cartItems,
// });

const mapStateToProps = (state) => ({
 cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropDown);