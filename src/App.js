import React from "react";
// import "./styles/index.scss";
import CartOverlay from "./components/CartOverlay";
import Header from "./components/Header";
import Productitem from "./components/ProductItem";
import ProductsGrid from "./components/ProductsGrid";
class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <ProductsGrid />
      </div>
    );
  }
}

export default App;
