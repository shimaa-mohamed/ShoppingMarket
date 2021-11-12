import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/ProductsGridStyles.scss";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

/** This is a decribtion for the ProductsGrid component
 * this component is used for displaing the items available in the store according to the filteration of category
 * @param {array} allProductsArr - "state" keeps track of products to be viewed according to certain filteration
 * @function allProducts - takes the filter category in which products will be filterd accordingly and adjusts the filtered state with new result of filteration
 * @function getCategoriesNames - returns array of the available categories in the store
 * @function handleInput - sets state of allProductsArr according to user selection
 */
const GET_CATEGORY = gql`
  query category($categoryInput: CategoryInput) {
    category(input: $categoryInput) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
        brand
      }
    }
  }
`;
class ProductsGrid extends Component {
  state = {
    filter: "All",
  };
  getCategoriesNames() {
    const { categories } = this.props;
    const categoriesNames = categories.map((categoty) => categoty.name);
    return categoriesNames;
  }
  handleInput(e) {
    this.setState({
      filter: e.target.value,
    });
  }
  componentDidMount() {
    this.props.handleFilterProduct(this.state.allProductsArr);
  }
  render() {
    const { filter } = this.state;
    return (
      <>
        {this.props.allItems ? (
          <div className="product-grid-wrapper">
            <select defaultValue="All" onChange={(e) => this.handleInput(e)}>
              <option value="All">ALL</option>
              {this.getCategoriesNames().map((categoryName, index) => (
                <option key={index} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
            {filter === "All" ? (
              <>
                {this.props.allItems.map((item, i) => (
                  <ProductItem
                    key={i}
                    product={item}
                    selectedCurrency={this.props.selectedCurrency}
                  />
                ))}
              </>
            ) : (
              <>
                <Query
                  query={GET_CATEGORY}
                  variables={{ categoryInput: { title: filter } }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;
                    return (
                      <>
                        {data.category.products.map((item, i) => (
                          <ProductItem
                            key={i}
                            product={item}
                            selectedCurrency={this.props.selectedCurrency}
                          />
                        ))}
                      </>
                    );
                  }}
                </Query>
              </>
            )}
          </div>
        ) : (
          <p>loading</p>
        )}
      </>
    );
  }
}

export default ProductsGrid;
