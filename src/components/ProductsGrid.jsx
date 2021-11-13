import React, { Component } from "react";
import ProductItem from "./ProductItem";
import "../styles/ProductsGridStyles.scss";
import { Query } from "react-apollo";
import { GET_CATEGORY } from "../utils/gqlHelpers";

/** This is a decribtion for the ProductsGrid component
 * this component is used for displaing the items available in the store according to the filteration of category
 */

class ProductsGrid extends Component {
  render() {
    const { filter } = this.props;
    return (
      <>
        {this.props.allItems ? (
          <div className="product-grid-wrapper">
            <h1>{filter}</h1>
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
