import React, { Component } from "react";
import MiddleGreenImg from "../assets/middleGreen.svg";
import ArrowImg from "../assets/arrowImg.svg";
import EmptyCartImg from "../assets/emptyCartImg.svg";
import "../styles/HeaderStyles.scss";
import CurrencyOverlay from "./CurrencyOverlay";
import CartOverlay from "./CartOverlay";
class Header extends Component {
  state = {
    showCurrencyOverlay: false,
    showCart: false,
  };
  handleCurrency() {
    this.setState({ showCurrencyOverlay: !this.state.showCurrencyOverlay });
  }
  handleShowCart() {
    this.setState({ showCart: !this.state.showCart });
  }
  render() {
    const { showCurrencyOverlay, showCart } = this.state;
    return (
      <header className="header-wrapper">
        <ul className="header-wrapper__left">
          <li>
            <button>women</button>
          </li>
          <li>
            <button>men</button>
          </li>
          <li>
            <button>kids</button>
          </li>
        </ul>
        <img
          src={MiddleGreenImg}
          alt="middle-green-svg"
          className="header-wrapper__center"
        />
        <ul className="header-wrapper__right">
          <div
            className="header-wrapper__currency"
            onClick={() => this.handleCurrency()}
          >
            ${" "}
            <img
              src={ArrowImg}
              alt="arrow-img"
              className={`${showCurrencyOverlay ? "rotate" : ""}`}
            />
            {showCurrencyOverlay && <CurrencyOverlay />}
          </div>

          <div
            className="header-wrapper__cart-badge"
            onClick={() => this.handleShowCart()}
          >
            <img
              src={EmptyCartImg}
              alt="cart-img"
              className="header-wrapper__cart-img"
            />{" "}
            <div className="header-wrapper__items-num">{this.props.numItems}</div>
          </div>
          {showCart && (
            <CartOverlay
              handleShowCart={() => this.handleShowCart()}
              numItems={this.props.numItems}
              handleNumItems={this.props.handleNumItems}
            />
          )}
        </ul>
      </header>
    );
  }
}

export default Header;
