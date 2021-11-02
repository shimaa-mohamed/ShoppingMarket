import React, { Component } from "react";
import CartItem from "./CartItem";
import "../styles/CartOverlayStyles.scss";
import { Link } from "react-router-dom";

class CartOverlay extends Component {
  getItemPrice(cartItemPrices) {
    const { selectedCurrency } = this.props;
    return cartItemPrices.find((price) => price.currency === selectedCurrency)
      .amount;
  }
  handleTotalBill(){
    let bill=0;
    this.props.cart.forEach((item)=>{
      bill=bill+(item.quantity*this.getItemPrice(item.prices))
    });
    return bill;
  }
  render() {
    
    const { cart ,selectedCurrency} = this.props;
    return (
      <div className="modal-cover">
        <div className="cart-overlay-wrapper">
          <header>
            My Bag <span>{this.props.numItems} items</span>
          </header>
          {cart.map((item, index) => (
          <CartItem
          wrapperStyle="cart-overlay-item-wrapper"
            key={index}
            product={item}
            handleCart={this.props.handleCart}
            cart={cart}
            selectedCurrency={this.props.selectedCurrency}
          />
        ))}
          <footer>
            <div className="cart-overlay-wrapper__total">
              <p>Total</p>
              <p>{selectedCurrency&& new Intl.NumberFormat("en", {
              style: "currency",
              currency: selectedCurrency,
            }).format(this.handleTotalBill())}</p>
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
