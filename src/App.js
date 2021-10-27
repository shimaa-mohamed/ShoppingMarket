import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductsGrid";
import ProductDetails from "./components/ProductDetails";
class App extends React.Component {
  state = {
    numItems: 0,
    cart: [],
  };
  handleNumItems(newNumItems) {
    this.setState({ numItems: newNumItems });
  }
  handleCart(editCart, cartItem) {
    if (editCart === "+") {
      this.setState((prev) => ({ cart: [...prev, cartItem] }));
    } else {
      const filteredCart = this.state.cart.filter((item) => {
        return item.id !== cartItem.id;
      });
      this.setState({ cart: filteredCart });
    }
  }
  render() {
    return (
      <Router className="app-wrapper">
        <Header
          numItems={this.state.numItems}
          handleNumItems={(newNum) => this.handleNumItems(newNum)}
        />
        <Switch>
          <Route exact path="/">
            <ProductsGrid />
          </Route>
          <Route path="/cart">
            <CartPage
              numItems={this.state.numItems}
              handleNumItems={(newNum) => this.handleNumItems(newNum)}
            />
          </Route>
          <Route path="/product/:id">
            <ProductDetails
              numItems={this.state.numItems}
              handleNumItems={(newNum) => this.handleNumItems(newNum)}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
