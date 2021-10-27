import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import * as dummy from "../utils/dummy.json";
import "../styles/CartOverlayItemStyles.scss";

class CartOverlayItem extends Component {
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
        console.log(this.props.numItems);
        this.props.handleNumItems(this.props.numItems - 1);
      }
    }
  }
  render() {
    // const { product } = this.props;
    const product = dummy.productItem;
    const { numberOfItems } = this.state;
    const AttributeItems = ({ items, itemsType, productName }) => {
      return (
        <ul className="cart-overlay-item-wrapper__attr-row">
          {items.map((item, j) => {
            return (
              <li key={j} className="cart-overlay-item-wrapper__attr-item">
                <input
                  id={item.value}
                  type="radio"
                  name={itemsType + productName}
                  value={item.value}
                />
                <label class="custom-radio" for={item.value}>
                  {item.displayValue}
                </label>
              </li>
            );
          })}
        </ul>
      );
    };
    return (
      <div className="cart-overlay-item-wrapper">
        <section className="cart-overlay-item-wrapper__left">
          <p className="cart-overlay-item-wrapper__brand">{"Brand"}</p>
          <p className="cart-overlay-item-wrapper__product-name">
            {"productName"}
          </p>
          <p className="cart-overlay-item-wrapper__price">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(50)}
          </p>
          {product.attributes.map((attribute, i) => {
            return (
              <ul key={i}>
                <AttributeItems
                  items={attribute.items}
                  itemsType={attribute.name}
                  productName={product.name}
                />
              </ul>
            );
          })}
        </section>
        <section className="cart-overlay-item-wrapper__right">
          <div className="cart-overlay-item-wrapper__count">
            <button
              value="+"
              onClick={(e) => {
                this.handleCount(e);
              }}
            >
              +
            </button>
            {numberOfItems}
            <button
              value="-"
              onClick={(e) => {
                this.handleCount(e);
              }}
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

export default CartOverlayItem;
