import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import "../styles/ProductItemStyles.scss";
class ProductItem extends Component {
  render() {
    const currentCurrency="USD";
    const { product } = this.props;
    const {currency,amount}=product.prices.find((price)=>price.currency===currentCurrency);
    console.log(product);
    return (
      <div className="item-wrapper">
        <img src={ItemImg} alt="item-img" className="item-wrapper__img" />
        <p className="item-wrapper__describtion">{product.description}</p>
        <p className="item-wrapper__price">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: currency,
          }).format(amount)}
        </p>
      </div>
    );
  }
}

export default ProductItem;
