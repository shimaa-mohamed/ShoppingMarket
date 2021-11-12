import React, { Component } from "react";
import "../styles/ProductDetailsStyles.scss";
import AttributeItems from "./AttributeItems";
import { Query } from "react-apollo";
import { GET_PRODUCT } from "../utils/gqlHelpers";

/**This is a decribtion for the ProductDetails component
 * this is product describtion page in which more info about the product is viewed and the user can add the item to cart in this page.
 * @param {array} selectedOptions - keeps track of the items selected options in the cart
 * @param {string} mainImg - keeps track of the main image to bw shown in the project describtion page
 * @function isOptionsNotSelected - returns true or false based on if the user selects all options or not
 * @function addToCart - this function handles three cases when clicking add to card button (case1) if user didn't select all options an alert will pop up and item will not be added unless the user enters all the options required (case2) handles if the item is not in stock so also it will not be added to the cart (case3) when there is no execptions the item will be added to cart with the selected options the user added
 * @function handleSelectedOptions - sets state of selectedOptions according to the selected values by the user
 * @function handleSelectedImg - sets state of mainImg withe the selected image by user
 */

class ProductDetails extends Component {
  state = {
    selectedOptions: [],
    mainImg: "",
  };
  componentDidMount() {
    const product = this.props.allItems.find(
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
    const copySelectedOptions = JSON.parse(JSON.stringify(selectedOptions));
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
      selectedOptions: copySelectedOptions,
    };
    const customItem = { ...product, ...moreProductDetails };

    this.props.handleAddToCart(customItem);
  }
  handleSelectedOptions(editedAttributes) {
    this.setState({ selectedOptions: editedAttributes });
  }
  handleSelectedImg(imgSrc) {
    this.setState({ mainImg: imgSrc });
  }
  getPriceAmount(prices) {
    const { selectedCurrency } = this.props;
    const price = prices.find((price) => price.currency === selectedCurrency);
    return price.amount;
  }
  render() {
    const { selectedCurrency } = this.props;
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ productId: this.props.productId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          return (
            <div className="product-details-wrapper">
              {selectedCurrency && (
                <>
                  <section className="product-details-wrapper__left">
                    <div className="product-details-wrapper__small-imgs-wrapper">
                      {data.product.gallery.map((imgSrc, index) => (
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
                    <p className="product-details-wrapper__brand">
                      {data.product.brand}
                    </p>
                    <p className="product-details-wrapper__product-name">
                      {data.product.name}
                    </p>
                    <h3>Price :</h3>
                    <p className="product-details-wrapper__price">
                      {new Intl.NumberFormat("en", {
                        style: "currency",
                        currency: selectedCurrency,
                      }).format(this.getPriceAmount(data.product.prices))}
                    </p>
                    {data.product.attributes.map((attribute, i) => {
                      return (
                        <ul key={i}>
                          <h3>{attribute.name} :</h3>
                          <AttributeItems
                            items={attribute.items}
                            attributesName={attribute.name}
                            productId={data.product.id}
                            attributeType={attribute.type}
                            componentWrapper="product-details-wrapper"
                            selectedOptions={this.state.selectedOptions}
                            handleSelectedOptions={(editedAttributes) =>
                              this.handleSelectedOptions(editedAttributes)
                            }
                            parentComponent="projectDetails"
                          />
                        </ul>
                      );
                    })}
                    <button
                      className="product-details-wrapper__add-to-cart"
                      onClick={() => this.addToCart(data.product)}
                    >
                      ADD TO CART
                    </button>
                    <p
                      className="product-details-wrapper__description"
                      dangerouslySetInnerHTML={{
                        __html: data.product.description,
                      }}
                    />
                  </section>
                </>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetails;
