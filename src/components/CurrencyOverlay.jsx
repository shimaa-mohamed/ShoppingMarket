import React, { Component } from "react";
import "../styles/CurrencyOverlayStyles.scss";

/** This is a decribtion for the CurrencyOverlay component
 * this is currency overlay component that lists the available currencies to deal with throw the store
 */
class CurrencyOverlay extends Component {
  render() {
    const {currencies}=this.props;
    return (
      <ul className="currency-overlay-wrapper">
        {currencies.map((item, i) => {
          return (
            <li className="currency-overlay-wrapper__item" key={i} onClick={()=>this.props.handleSelectedCurrency(item)}>
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
