import React, { Component } from "react";
import CartOverlayItem from "./CartOverlayItem";
import "../styles/CartOverlayStyles.scss"

class CartOverlay extends Component {
  render() {
    return (
      <div className="cart-overlay-wrapper">
        <header>
          My Bag <span>{2} items</span>
        </header>
        {
          [<main>
            <CartOverlayItem />
            <CartOverlayItem />
          </main>]
        }
        <footer>
          <div className="cart-overlay-wrapper__total">
            <p>Total</p>
            <p>{100}</p>
          </div>
          <div className="cart-overlay-wrapper__footer-btns">
            <button>view bag</button>
            <button>checkout</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default CartOverlay;
