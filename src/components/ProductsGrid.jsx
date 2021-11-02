import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/ProductsGridStyles.scss";
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
    console.log("productsGrid mounted");
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
