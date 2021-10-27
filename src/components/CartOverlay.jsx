import React, { Component } from "react";
import CartOverlayItem from "./CartOverlayItem";
import "../styles/CartOverlayStyles.scss";
import { Link } from "react-router-dom";

class CartOverlay extends Component {
  render() {
    return (
      <div className="modal-cover">
        <div className="cart-overlay-wrapper">
          <header>
            My Bag <span>{this.props.numItems} items</span>
          </header>
          {[
            <main>
              <CartOverlayItem
                numItems={this.props.numItems}
                handleNumItems={this.props.handleNumItems}
              />
              <CartOverlayItem
                numItems={this.props.numItems}
                handleNumItems={this.props.handleNumItems}
              />
            </main>,
          ]}
          <footer>
            <div className="cart-overlay-wrapper__total">
              <p>Total</p>
              <p>{100}</p>
            </div>
            <div className="cart-overlay-wrapper__footer-btns">
              <Link
                to="/cart"
                className="link"
                onClick={() => this.props.handleShowCart()}
              >
                view bag
              </Link>
              <Link
                to="/"
                className="link"
                onClick={() => this.props.handleShowCart()}
              >
                checkout
              </Link>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
