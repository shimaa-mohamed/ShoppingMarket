import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/ProductsGridStyles.scss";

/** This is a decribtion for the ProductsGrid component
 * this component is used for displaing the items available in the store according to the filteration of category
 * @param {array} filteredProducts - "state" keeps track of products to be viewed according to certain filteration
 * @function filterProducts - takes the filter category in which products will be filterd accordingly and adjusts the filtered state with new result of filteration
 * @function getCategoriesNames - returns array of the available categories in the store
 * @function handleInput - sets state of filteredProducts according to user selection
 */
class ProductsGrid extends Component {
  state = {
    filteredProducts: this.filterProducts("All"),
  };

  filterProducts(filter) {
    const { categories } = this.props;
    let filteredArr;
    if (filter === "All") {
      const productsArray = categories.map((category) => {
        return category.products;
      });
      filteredArr = productsArray.flat(1);
    } else {
      const categoryObject = categories.find((category) =>
        category.name.includes(filter)
      );
      filteredArr = categoryObject.products;
    }
    return filteredArr;
  }
  getCategoriesNames() {
    const { categories } = this.props;
    const categoriesNames = categories.map((categoty) => categoty.name);
    return categoriesNames;
  }
  handleInput(e) {
    this.setState({
      filteredProducts: this.filterProducts(e.target.value),
    });
  }
  componentDidMount() {
    this.props.handleFilterProduct(this.state.filteredProducts);
  }
  render() {
    const { filteredProducts } = this.state;
    return (
      <div className="product-grid-wrapper">
        <select defaultValue="All" onChange={(e) => this.handleInput(e)}>
          <option value="All">ALL</option>
          {this.getCategoriesNames().map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
        {filteredProducts.map((item, i) => (
          <ProductItem
            key={i}
            product={item}
            selectedCurrency={this.props.selectedCurrency}
          />
        ))}
      </div>
    );
  }
}

export default ProductsGrid;
