import React, { Component } from "react";
import "../styles/ProductDetailsStyles.scss";

class ProductDetails extends Component {
  state = {
    selectedOptions: [],
    mainImg: "",
  };
  componentDidMount() {
    const product = this.props.filteredProducts.find(
      (item) => item.id === this.props.productId
    );
    this.setState({ mainImg: product.gallery[0] });
    product.attributes.forEach((attribute) => {
      const customAttribute = {
        attributeName: `${attribute.name} ${product.id}`,
        userSelection: "",
      };
      this.setState((prev) => ({
        selectedOptions: [...prev.selectedOptions, customAttribute],
      }));
    });
  }
  isOptionsNotSelected() {
    const { selectedOptions } = this.state;
    return selectedOptions.some((option) => option.userSelection === "");
  }
  addToCart(product) {
    const { selectedOptions } = this.state;
    if (!product.inStock) {
      alert("Sorry this item is out of stock !");
      return;
    }
    if (this.isOptionsNotSelected()) {
      alert("Please select all options !");
      return;
    }
    const moreProductDetails = {
      quantity: 1,
      selectedOptions,
    };
    const customItem = { ...product, ...moreProductDetails };
    this.props.handleAddToCart(customItem);
  }
  isChecked(val, itemsName) {
    const { selectedOptions } = this.state;
    return selectedOptions.some((attr) => {
      return attr.userSelection === val && itemsName === attr.attributeName;
    });
  }
  handleInput(e) {
    const { name, value } = e.target;
    const { selectedOptions } = this.state;
    const editedAttributes = selectedOptions.map((attr) => {
      if (attr.attributeName === name) {
        attr.userSelection = value;
      }
      return attr;
    });
    this.setState({ selectedOptions: editedAttributes });
  }
  handleSelectedImg(imgSrc) {
    this.setState({ mainImg: imgSrc });
  }
  render() {
    console.log(this.state.selectedOptions);
    const product = this.props.filteredProducts.find(
      (item) => item.id === this.props.productId
    );
    const AttributeItems = ({
      items,
      itemsName,
      productId,
      itemType,
      attrName,
    }) => {
      return (
        <ul className="product-details-wrapper__attr-row">
          {items.map((item, j) => {
            return (
              <li key={j} className="product-details-wrapper__attr-item">
                <div
                  className={this.isChecked(item.value,`${itemsName} ${productId}`) ? "inputChecked" : ""}
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
    const { selectedCurrency } = this.props;
    const price = product.prices.find(
      (price) => price.currency === selectedCurrency
    );
    //console.log(this.state.selectedOptions.some((attr)=>attr.userSelection === "512G" && "Capacity apple-imac-2021"===attr.attributeName));
    return (
      <div className="product-details-wrapper">
        {selectedCurrency && (
          <>
            <section className="product-details-wrapper__left">
              <div className="product-details-wrapper__small-imgs-wrapper">
                {product.gallery.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt="img-item"
                    onClick={() => this.handleSelectedImg(imgSrc)}
                  />
                ))}
              </div>
              <img
                src={this.state.mainImg}
                alt="img-item"
                className="product-details-wrapper__big-img"
              />
            </section>
            <section className="product-details-wrapper__right">
              <p className="product-details-wrapper__brand">{product.brand}</p>
              <p className="product-details-wrapper__product-name">
                {product.name}
              </p>
              <h3>Price :</h3>
              <p className="product-details-wrapper__price">
                {new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: selectedCurrency,
                }).format(price.amount)}
              </p>
              {product.attributes.map((attribute, i) => {
                return (
                  <ul key={i}>
                    <h3>{attribute.name} :</h3>
                    <AttributeItems
                      items={attribute.items}
                      itemsName={attribute.name}
                      productId={product.id}
                      itemType={attribute.type}
                      attrName={i}
                    />
                  </ul>
                );
              })}
              <button
                className="product-details-wrapper__add-to-cart"
                onClick={() => this.addToCart(product)}
              >
                ADD TO CART
              </button>
              <p
                className="product-details-wrapper__description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </section>
          </>
        )}
      </div>
    );
  }
}

export default ProductDetails;
