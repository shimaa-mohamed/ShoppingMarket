import React, { Component } from "react";
import MiddleGreenImg from "../assets/middleGreen.svg";
import ArrowImg from "../assets/arrowImg.svg";
import EmptyCartImg from "../assets/emptyCartImg.svg";
import "../styles/HeaderStyles.scss";
import CurrencyOverlay from "./CurrencyOverlay";
class Header extends Component {
  state = {
    showCurrencyOverlay: false,
  };
  handleCurrency() {
    console.log("hellooooo");
    this.setState({showCurrencyOverlay:!this.state.showCurrencyOverlay})
  }
  render() {
    const { showCurrencyOverlay } = this.state;
    console.log(showCurrencyOverlay);
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
            onClick={()=>this.handleCurrency()}
          >
            $ <img src={ArrowImg} alt="arrow-img" />
            {showCurrencyOverlay && <CurrencyOverlay />}
          </div>

          <div className="header-wrapper__cart-badge">
            <img
              src={EmptyCartImg}
              alt="cart-img"
              className="header-wrapper__cart-img"
            />{" "}
            <div className="header-wrapper__items-num">5</div>
          </div>
        </ul>
      </header>
    );
  }
}

export default Header;
