import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductsGrid";
import ProductDetails from "./components/ProductDetails";
import { graphql } from "react-apollo";
import { combinedQueries } from "./utils/gqlHelpers";
class App extends React.Component {
  state = {
    numItems: 0,
    cart: [],
    selectedCurrency: "",
    filteredProducts: [],
    totalBill: 0,
  };
  handleNumItems(newNumItems) {
    this.setState({ numItems: newNumItems });
  }
  handleFilterProduct(filteredProducts) {
    this.setState({ filteredProducts: filteredProducts });
  }
  shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    console.log(object1, object2);
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
  isItemInCart(itemToBeAdded) {
    // Check if cartItem is already in cart array
    const { cart } = this.state;
    if (cart.some((item) => item.id === itemToBeAdded.id) === false)
      return false;

    const itemWithSameId = cart.find((item) => item.id === itemToBeAdded.id);
    for (let i = 0; i < itemToBeAdded.selectedOptions.length; i++) {
      let obj1 = itemToBeAdded.selectedOptions[i];
      let obj2 = itemWithSameId.selectedOptions[i];
      // console.log(!this.shallowEqual(obj1,obj2));
      if (!this.shallowEqual(obj1, obj2)) {
        return false;
      }
    }
    return true;
  }
  getItemIndex(cartItemId) {
    const { cart } = this.state;
    return cart.findIndex((item) => item.id === cartItemId);
  }
  getItemQuantity(cartItemId) {
    const { cart } = this.state;
    return cart.find((item) => item.id === cartItemId).quantity;
  }
  incrementOrDecrementCart(cartItemId, operation) {
    const { cart } = this.state;
    const newCart = cart.map((item) => {
      const newQuantity =
        operation === "+" ? item.quantity + 1 : item.quantity - 1;
      if (item.id === cartItemId) item.quantity = newQuantity;
      return item;
    });
    this.setState({ cart: newCart });
    this.setState((prev) => ({
      numItems: operation === "+" ? prev.numItems + 1 : prev.numItems - 1,
    }));
  }
  handleCart(operation, cartItemId) {
    const { cart } = this.state;
    if (operation === "+") {
      this.incrementOrDecrementCart(cartItemId, "+");
    }
    if (operation === "-" && this.getItemQuantity(cartItemId) === 1) {
      const filteredCart = cart.filter((item) => {
        return item.id !== cartItemId;
      });
      this.setState({ cart: filteredCart });
      this.setState((prev) => ({ numItems: prev.numItems - 1 }));
    }
    if (operation === "-" && this.getItemQuantity(cartItemId) > 1) {
      this.incrementOrDecrementCart(cartItemId, "-");
    }
  }
  handleAddToCart(cartItem) {
    // console.log(this.isItemInCart(cartItem));
    if (this.isItemInCart(cartItem)) {
      this.incrementOrDecrementCart(cartItem.id, "+");
    }
    // append new item to cart
    else {
      this.setState((prev) => ({ cart: [...prev.cart, cartItem] }));
      this.setState((prev) => ({ numItems: prev.numItems + 1 }));
    }
    //TODO: fix isItemInCart fn
    //TODO: ability to add same item but with different options in separate entry in the cart and the increment is based on the "id of the item and the selected options of this item"
  }
  handleSelectedCurrency(val) {
    this.setState({ selectedCurrency: val });
  }

  render() {
    const { categories, currencies, loading } = this.props.data;
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
            />
            <Switch>
              <Route exact path="/">
                <ProductsGrid
                  categories={categories}
                  selectedCurrency={this.state.selectedCurrency}
                  currencies={currencies}
                  handleSelectedCurrency={(val) =>
                    this.handleSelectedCurrency(val)
                  }
                  handleFilterProduct={(val) => this.handleFilterProduct(val)}
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
                    filteredProducts={this.state.filteredProducts}
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
