import React, { Component } from "react";
import CartItem from "./CartItem";
import "../styles/CartPageStyles.scss";

/** This is a decribtion for the CartPage component
 * this cart page is responsible in listing items in cart with the user selction details
 */
class CartPage extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="cart-page-wrapper">
        <h1>Cart</h1>
        {cart.map((item, index) => (
          <CartItem
          wrapperStyle="cart-item-wrapper"
            key={index}
            product={item}
            handleCart={this.props.handleCart}
            cart={cart}
            selectedCurrency={this.props.selectedCurrency}
          />
        ))}

      </div>
    );
  }
}

export default CartPage;
