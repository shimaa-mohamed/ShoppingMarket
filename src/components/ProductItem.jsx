import React, { Component } from "react";
import "../styles/ProductItemStyles.scss";
import { Link } from "react-router-dom";
/** This is a decribtion for the ProductItem component
 * this components is responsible of showing each item in the productsGrid and show its data in a cart and each item navigates to describtion page for the product including more details about it.
 * @param {object} product - "prop" contains data of the item from the store
 * @param {string} selectedCurrency - "prop" the selected currency code for viewing the price in given currency
 */
class ProductItem extends Component {
  render() {
    const { product } = this.props;
    const { selectedCurrency } = this.props;
    const price = product.prices.find(
      (price) => price.currency === selectedCurrency
    );
    return (
      <Link to={`/product/${product.id}`} className="item-wrapper">
        <div className="item-wrapper__img-wrapper">
          <img
            src={product.gallery[0]}
            alt="item-img"
            className="item-wrapper__img"
          />
          <div className={product.inStock ? "hide" : "overlay"}></div>
          <p className={product.inStock ? "hide" : "center"}>out of stock</p>
        </div>
        <p className="item-wrapper__describtion">
          {product.brand} {product.name}
        </p>
        <p className="item-wrapper__price">
          {selectedCurrency.length &&
            new Intl.NumberFormat("en", {
              style: "currency",
              currency: selectedCurrency,
            }).format(price.amount)}
        </p>
      </Link>
    );
  }
}

export default ProductItem;
