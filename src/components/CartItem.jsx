import React, { Component } from "react";
import {ReactComponent as RightArrow} from "../assets/right-arrow.svg";
import {ReactComponent as LeftArrow} from "../assets/left-arrow.svg";
import "../styles/CartItemStyles.scss";
import "../styles/CartOverlayItemStyles.scss";

class CartItem extends Component {
  state={
    selectedImgIndex:0
  }
  handleSelectedImg(leftOrRight){
    const {selectedImgIndex}=this.state;
    const galleryLength=this.props.product.gallery.length;
    if(galleryLength===1) return;
    if(leftOrRight==="left"&& selectedImgIndex>0){
      this.setState({selectedImgIndex:this.state.selectedImgIndex-1})
    }
    if(leftOrRight==="right"&& selectedImgIndex<galleryLength-1){
      this.setState({selectedImgIndex:this.state.selectedImgIndex+1})
    }
  }
  handleCount(e) {
    if (e.target.value === "+") {
      this.props.handleCart("+", this.props.product.id);
    } else {
      if (this.props.product.quantity > 0) {
        this.props.handleCart("-", this.props.product.id);
      }
    }
  }
  isChecked(val, itemsName) {
    const { selectedOptions } = this.props.product;
    return selectedOptions.some((attr) => {
      return attr.userSelection === val && itemsName === attr.attributeName;
    });
  }
  handleInput(e) {
    const { name, value } = e.target;
    const { selectedOptions } = this.props.product;
    const editedAttributes = selectedOptions.map((attr) => {
      if (attr.attributeName === name) attr.userSelection = value;
      return attr;
    });
    this.setState({ selectedOptions: editedAttributes });
  }
  render() {
    const { product, selectedCurrency } = this.props;
    const price = product.prices.find(
      (price) => price.currency === selectedCurrency
    );
    const AttributeItems = ({ items, itemsName, productId, itemType }) => {
      return (
        <ul className={`${this.props.wrapperStyle}__attr-row`}>
          {items.map((item, j) => {
            return (
              <li key={j} className={`${this.props.wrapperStyle}__attr-item`}>
                <div
                  className={
                    this.isChecked(item.value, `${itemsName} ${productId}`)
                      ? "inputChecked"
                      : ""
                  }
                >
                  <input
                    id={`${itemsName}/${item.value}`}
                    type="radio"
                    name={`${itemsName} ${productId}`}
                    value={item.value}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <label
                    className="custom-radio"
                    htmlFor={`${itemsName}/${item.value}`}
                    id={itemType === "swatch" ? "swatch" : ""}
                    style={
                      itemType === "swatch"
                        ? { backgroundColor: item.value }
                        : null
                    }
                  >
                    {itemType !== "swatch" ? item.displayValue : ""}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      );
    };
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
                  itemsName={attribute.name}
                  productId={product.id}
                  itemType={attribute.type}
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
            <img src={product.gallery[this.state.selectedImgIndex]} alt="item-img" />
            <div className="arrow-div">
              <LeftArrow className="arrow" onClick={()=>this.handleSelectedImg("left")}/>
              <RightArrow className="arrow" onClick={()=>this.handleSelectedImg("right")}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CartItem;
