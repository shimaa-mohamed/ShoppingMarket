import React, { Component } from "react";
import "../styles/ProductItemStyles.scss";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { product } = this.props;
    const { selectedCurrency } = this.props;
    const price = product.prices.find(
      (price) => price.currency === selectedCurrency
    );
    return (
      <div>
          <Link to={`/product/${product.id}`} className="item-wrapper">
            <div className="item-wrapper__img-wrapper">
            <img src={product.gallery[0]} alt="item-img" className="item-wrapper__img" />
            <div className={product.inStock?"hide":"overlay"}></div>
            <p className={product.inStock?"hide":"center"}>out of stock</p>
            </div>
            <p className="item-wrapper__describtion">
              {product.brand} {product.name}
            </p>
            <p className="item-wrapper__price">
              {selectedCurrency.length &&new Intl.NumberFormat("en", {
                style: "currency",
                currency: selectedCurrency,
              }).format(price.amount)}
            </p>
          </Link>
        
      </div>
    );
  }
}

export default ProductItem;
