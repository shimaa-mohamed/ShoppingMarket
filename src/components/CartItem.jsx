import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import * as dummy from "../utils/dummy.json";
import "../styles/CartItemStyles.scss";

class CartItem extends Component {
  state = {
    numberOfItems: 0,
  };
  handleCount(e) {
    if (e.target.value === "+") {
      this.setState((previousState) => ({
        numberOfItems: previousState.numberOfItems + 1,
      }));
      this.props.handleNumItems(this.props.numItems + 1);
    } else {
      if (this.state.numberOfItems > 0) {
        this.setState((previousState) => ({
          numberOfItems: previousState.numberOfItems - 1,
        }));
        this.props.handleNumItems(this.props.numItems - 1);
      }
    }
  }
  render() {
    // const { product } = this.props;
    const product = dummy.productItem;

    const AttributeItems = ({ items }) => {
      return (
        <ul className="cart-item-wrapper__attr-row">
          {items.map((item, j) => {
            return (
              <li key={j} className="cart-item-wrapper__attr-item">
                <button>{item.displayValue}</button>
              </li>
            );
          })}
        </ul>
      );
    };
    return (
      <div className="cart-item-wrapper">
        <section className="cart-item-wrapper__left">
          <p className="cart-item-wrapper__brand">{"Brand"}</p>
          <p className="cart-item-wrapper__product-name">{"productName"}</p>
          <p className="cart-item-wrapper__price">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(50)}
          </p>
          {product.attributes.map((attribute, i) => {
            return (
              <ul key={i}>
                <AttributeItems items={attribute.items} />
              </ul>
            );
          })}
        </section>
        <section className="cart-item-wrapper__right">
          <div className="cart-item-wrapper__count">
            <button
              onClick={(e) => {
                this.handleCount(e);
              }}
              value="+"
            >
              +
            </button>
            {this.state.numberOfItems}
            <button
              onClick={(e) => {
                this.handleCount(e);
              }}
              value="-"
            >
              -
            </button>
          </div>
          <img src={ItemImg} alt="item-img" />
        </section>
      </div>
    );
  }
}

export default CartItem;
