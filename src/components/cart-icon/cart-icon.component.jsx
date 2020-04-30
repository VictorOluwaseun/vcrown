import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";

import "./cart-icon-styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
 <div className="cart-icon" onClick={toggleCartHidden}>
  <ShoppingIcon className="shopping-icon" />
  <span className="item-count">{itemCount}</span>
 </div>
);

//This get called everytime, so there is need for memoization
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//  itemCount: cartItems.reduce(
//   (accumulator, nextValue) => accumulator + nextValue.quantity,
//   0
//  ),
// });
const mapStateToProps = createStructuredSelector({
 itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
 toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
