import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import "../styles/ProductItemStyles.scss";
import {Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const currentCurrency="USD";
    const { product } = this.props;
    const {currency,amount}=product.prices.find((price)=>price.currency===currentCurrency);
    return (
      <Link to={`/product/${123}`} product className="item-wrapper">
        <img src={ItemImg} alt="item-img" className="item-wrapper__img" />
        <p className="item-wrapper__describtion">{product.brand} {product.name}</p>
        <p className="item-wrapper__price">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: currency,
          }).format(amount)}
        </p>
      </Link>
    );
  }
}

export default ProductItem;
