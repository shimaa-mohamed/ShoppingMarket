import React, { Component } from "react";
import ItemImg from "../assets/itemImage.jpg";
import * as dummy from "../utils/dummy.json";
import "../styles/ProductDetailsStyles.scss";

class ProductDetails extends Component {
  handleAddToCart(){
    this.props.handleNumItems(this.props.numItems + 1);
  }
  render() {
    // const { product } = this.props;
    const product = dummy.productItem;
    const AttributeItems = ({ items, itemsType }) => {
      return (
        <ul className="product-details-wrapper__attr-row">
          {items.map((item, j) => {
            return (
              <li key={j} className="product-details-wrapper__attr-item">
                <input
                  id={item.value}
                  type="radio"
                  name={itemsType}
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
      <div className="product-details-wrapper">
        <section className="product-details-wrapper__left">
          <div className="product-details-wrapper__small-imgs-wrapper">
            <img src={ItemImg} alt="img-item" />
            <img src={ItemImg} alt="img-item" />
            <img src={ItemImg} alt="img-item" />
          </div>

          <img
            src={ItemImg}
            alt="img-item"
            className="product-details-wrapper__big-img"
          />
        </section>
        <section className="product-details-wrapper__right">
          <p className="product-details-wrapper__brand">{"Brand"}</p>
          <p className="product-details-wrapper__product-name">
            {"productName"}
          </p>
          <h3>Price :</h3>
          <p className="product-details-wrapper__price">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(50)}
          </p>
          {product.attributes.map((attribute, i) => {
            return (
              <ul key={i}>
                <h3>{attribute.name} :</h3>
                <AttributeItems
                  items={attribute.items}
                  itemsType={attribute.name}
                />
              </ul>
            );
          })}
          <button className="product-details-wrapper__add-to-cart" onClick={()=>this.handleAddToCart()}>
            ADD TO CART
          </button>
          <p className="product-details-wrapper__description">
            {
              "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
            }
          </p>
        </section>
      </div>
    );
  }
}

export default ProductDetails;
