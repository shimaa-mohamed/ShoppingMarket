import React, { Component } from "react";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import "../styles/CartItemStyles.scss";
import "../styles/CartOverlayItemStyles.scss";
import AttributeItems from "./AttributeItems";

/**This is a decribtion for the CartItem component
 * the cart item component is responsible for Showing details about the items in the list including the quantity of that item in cart and the user selected options for that item, user can increament or decrement the item quantity throw clicking the + or - buttons that are attached with each item
 * @param {number} selectedImgIndex - "state" keeps track of the index of the image of item shown which can be changed when user clicks the arrows above the image.
 * @function handleSelectedImg - is responsible of setting state of the selectedImgIndex by when user toogles between left and right arrow above the image
 * @function handleCount - is reponsible for increamenting or decreamnting the quantity of the item in the cart
 */
class CartItem extends Component {
  state = {
    selectedImgIndex: 0,
  };
  handleSelectedImg(leftOrRight) {
    const { selectedImgIndex } = this.state;
    const galleryLength = this.props.product.gallery.length;
    if (galleryLength === 1) return;
    if (leftOrRight === "left" && selectedImgIndex > 0) {
      this.setState({ selectedImgIndex: this.state.selectedImgIndex - 1 });
    }
    if (leftOrRight === "right" && selectedImgIndex < galleryLength - 1) {
      this.setState({ selectedImgIndex: this.state.selectedImgIndex + 1 });
    }
  }
  handleCount(e) {
    if (e.target.value === "+") {
      this.props.handleCart("+", this.props.product);
    } else {
      if (this.props.product.quantity > 0) {
        this.props.handleCart("-", this.props.product);
      }
    }
  }

  render() {
    const { product, selectedCurrency } = this.props;
    const price = product.prices.find(
      (price) => price.currency === selectedCurrency
    );

    return (
      <div className={`${this.props.wrapperStyle}`}>
        <section className={`${this.props.wrapperStyle}__left`}>
          <p className={`${this.props.wrapperStyle}__brand`}>{product.brand}</p>
          <p className={`${this.props.wrapperStyle}__product-name`}>
            {product.name}
          </p>
          <p className={`${this.props.wrapperStyle}__price`}>
            {selectedCurrency &&
              new Intl.NumberFormat("en", {
                style: "currency",
                currency: selectedCurrency,
              }).format(price.amount)}
          </p>
          {product.attributes.map((attribute, i) => {
            return (
              <ul key={i}>
                <AttributeItems
                  items={attribute.items}
                  attributesName={attribute.name}
                  productId={product.id}
                  attributeType={attribute.type}
                  componentWrapper={`${this.props.wrapperStyle}`}
                  selectedOptions={this.props.product.selectedOptions}
                  handleSelectedOptions={(editedAttributes) =>
                    this.handleSelectedOptions(editedAttributes)
                  }
                  parentComponent="cartItem"
                />
              </ul>
            );
          })}
        </section>
        <section className={`${this.props.wrapperStyle}__right`}>
          <div className={`${this.props.wrapperStyle}__count`}>
            <button
              onClick={(e) => {
                this.handleCount(e);
              }}
              value="+"
            >
              +
            </button>
            {product.quantity}
            <button
              onClick={(e) => {
                this.handleCount(e);
              }}
              value="-"
            >
              -
            </button>
          </div>
          <div className={`${this.props.wrapperStyle}__img-wrapper`}>
            <img
              src={product.gallery[this.state.selectedImgIndex]}
              alt="item-img"
            />
            <div className="arrow-div">
              <LeftArrow
                className="arrow"
                onClick={() => this.handleSelectedImg("left")}
              />
              <RightArrow
                className="arrow"
                onClick={() => this.handleSelectedImg("right")}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CartItem;
