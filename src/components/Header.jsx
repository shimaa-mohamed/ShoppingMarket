import React, { Component } from "react";
import MiddleGreenImg from "../assets/middleGreen.svg";
import ArrowImg from "../assets/arrowImg.svg";
import EmptyCartImg from "../assets/emptyCartImg.svg";
import "../styles/HeaderStyles.scss";
import CurrencyOverlay from "./CurrencyOverlay";
import CartOverlay from "./CartOverlay";
import { Link } from "react-router-dom";

/**This is a decribtion for the Header component
 * the header component contains three main parts (first) the left part whichh is the selection according to gender and age (second) the middle part which contains an icon that when clicked returns to main screen containing the grid of products (third) the right part contains the currency and carts buttons that shows their overlays
 * @param {boolean} showCurrencyOverlay - "state" determines whether to show the currency overlay or not
 * @param {boolean} showCart - "state" determines whether to show the cart overlay or 
 * @function handleCurrency - sets the showCurrencyOverlay state 
 * @function handleShowCart - sets the showCart state 
 */
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
  componentDidMount(){
    //initiate selected currency with the first currency in currency array recieved from app component from backend
    this.props.handleSelectedCurrency(this.props.currencies[0]);
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
        <Link to="/">
          <img
            src={MiddleGreenImg}
            alt="middle-green-svg"
            className="header-wrapper__center"
          />
        </Link>

        <ul className="header-wrapper__right">
          <div
            className="header-wrapper__currency"
            onClick={() => this.handleCurrency()}
          >
            {
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: this.props.selectedCurrency?this.props.selectedCurrency:this.props.currencies[0],
                }).format("")[0]
              }
            <img
              src={ArrowImg}
              alt="arrow-img"
              className={`${showCurrencyOverlay ? "rotate" : ""}`}
            />
            {showCurrencyOverlay && (
              <CurrencyOverlay
                currencies={this.props.currencies}
                handleSelectedCurrency={this.props.handleSelectedCurrency}
                getTotalBill={this.props.getTotalBill}
              />
            )}
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
            {
              this.props.numItems!==0&& <div className="header-wrapper__items-num">
              {this.props.numItems}
            </div>
            }
            
          </div>
          {showCart && (
            <CartOverlay
              handleShowCart={() => this.handleShowCart()}
              cart={this.props.cart}
              handleCart={this.props.handleCart}
              selectedCurrency={this.props.selectedCurrency}
              totalBill={this.props.totalBill}
              changeSelectedOptions={this.props.changeSelectedOptions}
            />
          )}
        </ul>
      </header>
    );
  }
}

export default Header;
