import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import * as dummy from "../utils/dummy.json";
import "../styles/CartOverlayItemStyles.scss"

class CartOverlayItem extends Component {

  render() {
    // const { product } = this.props;
    const product = dummy.productItem;
    const AttributeItems=({items})=>{
        return (
          <ul  className="cart-overlay-item-wrapper__attr-row">
            {items.map((item, j) => {
              return (
                <li key={j} className="cart-overlay-item-wrapper__attr-item">
                  <button>{item.displayValue}</button>
                </li>
              );
            })}
          </ul>
        );
      }
    return (
      <div className="cart-overlay-item-wrapper">
        <section className="cart-overlay-item-wrapper__left">
          <p className="cart-overlay-item-wrapper__product-name">{"productName"}</p>
          <p>
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(50)}
          </p>
          {product.attributes.map((attribute, i) => {
            return (
              <ul key={i}>
                <AttributeItems items={attribute.items}/>
              </ul>
            );
          })}
        </section>
        <section className="cart-overlay-item-wrapper__right">
          <div className="cart-overlay-item-wrapper__count">
            <button>+</button>
            {3}
            <button>-</button>
          </div>
          <img src={ItemImg} alt="item-img" />
        </section>
      </div>
    );
  }
}

export default CartOverlayItem;
