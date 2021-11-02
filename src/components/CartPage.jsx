import React, { Component } from "react";
import CartItem from "./CartItem";
import "../styles/CartPageStyles.scss";

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
