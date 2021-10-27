import React, { Component } from "react";
import CartItem from "./CartItem";
import "../styles/CartPageStyles.scss";

class CartPage extends Component {
  render() {
    return (
      <div className="cart-page-wrapper">
        <h1>Cart</h1>
        {[
          <main>
            <CartItem
              numItems={this.props.numItems}
              handleNumItems={this.props.handleNumItems}
            />
            <CartItem
              numItems={this.props.numItems}
              handleNumItems={this.props.handleNumItems}
            />
          </main>,
        ]}
      </div>
    );
  }
}

export default CartPage;
