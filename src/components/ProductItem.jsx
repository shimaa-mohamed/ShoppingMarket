import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import "../styles/ProductItemStyles.scss";
class ProductItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="item-wrapper">
        <img src={ItemImg} alt="item-img" className="item-wrapper__img" />
        <p className="item-wrapper__describtion">{product.description}</p>
        <p className="item-wrapper__price">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </p>
      </div>
    );
  }
}

export default ProductItem;
