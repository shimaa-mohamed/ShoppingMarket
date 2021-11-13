import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductsGrid";
import ProductDetails from "./components/ProductDetails";
import { graphql } from "react-apollo";
import { combinedQueries } from "./utils/gqlHelpers";

/** This is a description of the App component.
 * this component is the main component for the app which handles the routing and the shared data and methods through the app
 * @param {number} numItems - "state" keeps track of number of items in the cart through the whole app
 * @param {array} cart - "state" An array containing the items in the cart , each item contain product info and user selected options for that item and also the quantity of this item in cart
 * @param {string} selectedCurrency - "state" keeps track of the selected currency code through the whole app
 * @param {number} totalBill - "state" keeps track of the total bill based on the selected currency
 * @param {object} data -"prop" contains categories, currencies, loading returned from graphql server
 * @param {string} filter - "state" keeps track of filter used
 * @function handleFilter - sets state of filter according to user selection
 * @function handleNumItems - sets state of numItems
 * @function shallowEqual - returns true of false depending on whether the given objects are equal in keys and values.
 * @function areSelectedOptionsSame - returns true of false depending on whether the given selected options for given items are same or not.
 * @function isItemInCart - returns true of false depending on whether the given item is in cart with same id and selected options or not.
 * @function getItemQuantity - returns number indicating the quantity of given item in the cart.
 * @function incrementOrDecrementCart - edit the quantity of the item in cart according to required operation whether is was "+" so will increment the quantity of item in cart or "-" so it will decrement the quantity of item in the cart
 * @function handleCart - this functions is used when clicking onClicking add or subtract buttons in cartOverlay or in CartPage handles incrementung or decrementing cart or removing the item if its quantity was one and the user subtract it from the cart to remove his order of that item.
 * @function handleAddToCart - add item to cart it is called from the project describtion page and first check if the same item with same attr was added before, if so it will just increment the quantity of it in cart , but if it is not found it item will be appended in cart , and for both situations total number of items in cart will be increamented
 * @function handleSelectedCurrency - sets state of selectedCurrency
 * @function allProducts -returns all products available from all categories in one array
 */

class App extends React.Component {
  state = {
    numItems: 0,
    cart: [],
    selectedCurrency: "",
    totalBill: 0,
    filter: "All",
  };
  allProducts(categories) {
    let allProductsArr;
    const productsArray = categories.map((category) => {
      return category.products;
    });
    allProductsArr = productsArray.flat(1);
    return allProductsArr;
  }
  handleNumItems(newNumItems) {
    this.setState({ numItems: newNumItems });
  }
  shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }
  areSelectedOptionsSame(item1SelectedOptions, item2SelectedOptions) {
    if (item2SelectedOptions.length !== item1SelectedOptions.length)
      return false;
    for (let i = 0; i < item2SelectedOptions.length; i++) {
      let obj1 = item2SelectedOptions[i];
      let obj2 = item1SelectedOptions[i];
      if (!this.shallowEqual(obj1, obj2)) {
        return false;
      }
    }
    return true;
  }
  isItemInCart(itemToBeAdded) {
    // Check if cartItem is already in cart array
    const { cart } = this.state;
    if (cart.some((item) => item.id === itemToBeAdded.id) === false)
      return false;
    const itemsWithSameId = cart.filter((item) => item.id === itemToBeAdded.id);
    for (let j = 0; j < itemsWithSameId.length; j++) {
      if (
        itemToBeAdded.selectedOptions.length === 0 ||
        this.areSelectedOptionsSame(
          itemsWithSameId[j].selectedOptions,
          itemToBeAdded.selectedOptions
        )
      ) {
        console.log("ytra", itemToBeAdded.selectedOptions.length === 0);
        return true;
      }
    }
    return false;
  }
  getItemQuantity(cartItem) {
    const { cart } = this.state;
    return cart.find(
      (item) =>
        item.id === cartItem.id &&
        (cartItem.selectedOptions.length === 0 ||
          this.areSelectedOptionsSame(
            item.selectedOptions,
            cartItem.selectedOptions
          ))
    ).quantity;
  }
  incrementOrDecrementCart(cartItem, operation) {
    const { cart } = this.state;
    const newCart = cart.map((item) => {
      const newQuantity =
        operation === "+" ? item.quantity + 1 : item.quantity - 1;
      if (
        item.selectedOptions.length === 0 ||
        this.areSelectedOptionsSame(
          cartItem.selectedOptions,
          item.selectedOptions
        )
      ) {
        item.quantity = newQuantity;
      }
      return item;
    });
    this.setState({ cart: newCart });
    this.setState((prev) => ({
      numItems: operation === "+" ? prev.numItems + 1 : prev.numItems - 1,
    }));
  }
  handleCart(operation, cartItem) {
    const { cart } = this.state;
    if (operation === "+") {
      this.incrementOrDecrementCart(cartItem, "+");
    }
    if (operation === "-" && this.getItemQuantity(cartItem) === 1) {
      const filteredCart = cart.filter((item) => {
        return !(
          item.id === cartItem.id &&
          (cartItem.selectedOptions.length === 0 ||
            this.areSelectedOptionsSame(
              item.selectedOptions,
              cartItem.selectedOptions
            ))
        );
      });
      this.setState({ cart: filteredCart });
      this.setState((prev) => ({ numItems: prev.numItems - 1 }));
    }
    if (operation === "-" && this.getItemQuantity(cartItem) > 1) {
      this.incrementOrDecrementCart(cartItem, "-");
    }
  }
  handleAddToCart(cartItem) {
    if (this.isItemInCart(cartItem)) {
      this.incrementOrDecrementCart(cartItem, "+");
    }
    // append new item to cart
    else {
      this.setState((prev) => ({ cart: [...prev.cart, cartItem] }));
      this.setState((prev) => ({ numItems: prev.numItems + 1 }));
    }
  }
  handleSelectedCurrency(val) {
    this.setState({ selectedCurrency: val });
  }
  handleFilter(filterVal) {
    this.setState({
      filter:filterVal,
    });
  }

  render() {
    const { categories, currencies, loading } = this.props.data;
    console.log(this.state.filter);
    return (
      <Router className="app-wrapper">
        {loading ? (
          <p>loading</p>
        ) : (
          <div>
            <Header
              numItems={this.state.numItems}
              currencies={currencies}
              cart={this.state.cart}
              handleCart={(operation, cartItemId) =>
                this.handleCart(operation, cartItemId)
              }
              handleSelectedCurrency={(val) => this.handleSelectedCurrency(val)}
              selectedCurrency={this.state.selectedCurrency}
              totalBill={this.state.totalBill}
              getTotalBill={() => this.getTotalBill()}
              changeSelectedOptions={(oldOptions, newOptions) =>
                this.changeSelectedOptions(oldOptions, newOptions)
              }
              categories={categories}
              handleFilter={(filterVal)=>this.handleFilter(filterVal)}
            />
            <Switch>
              <Route exact path="/">
                <ProductsGrid
                  categories={categories}
                  allItems={this.allProducts(categories)}
                  selectedCurrency={this.state.selectedCurrency}
                  currencies={currencies}
                  handleSelectedCurrency={(val) =>
                    this.handleSelectedCurrency(val)
                  }
                  filter={this.state.filter}
                />
              </Route>
              <Route path="/cart">
                <CartPage
                  cart={this.state.cart}
                  handleCart={(operation, cartItemId) =>
                    this.handleCart(operation, cartItemId)
                  }
                  handleSelectedCurrency={(val) =>
                    this.handleSelectedCurrency(val)
                  }
                  selectedCurrency={this.state.selectedCurrency}
                />
              </Route>
              <Route
                path="/product/:id"
                render={(props) => (
                  <ProductDetails
                    numItems={this.state.numItems}
                    handleNumItems={(newNum) => this.handleNumItems(newNum)}
                    handleAddToCart={(cartItem) =>
                      this.handleAddToCart(cartItem)
                    }
                    productId={props.match.params.id}
                    selectedCurrency={this.state.selectedCurrency}
                    allItems={this.allProducts(categories)}
                    cart={this.state.cart}
                  />
                )}
              ></Route>
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}

export default graphql(combinedQueries)(App);
