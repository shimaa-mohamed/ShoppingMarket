import React, { Component } from "react";
import "../styles/CurrencyOverlayStyles.scss";
import * as dummy from "../utils/dummy.json";

class CurrencyOverlay extends Component {
  render() {
    return (
      <ul className="currency-overlay-wrapper">
        {dummy.currencies.map((item, i) => {
          console.log(item);
          return (
            <li className="currency-overlay-wrapper__item" key={i}>
              {
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: item,
                }).format("")[0]
              } {item}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CurrencyOverlay;
