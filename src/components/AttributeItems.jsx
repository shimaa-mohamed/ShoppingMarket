import React, { Component } from "react";
import "../styles/ProductDetailsStyles.scss";
import "../styles/CartItemStyles.scss";
import "../styles/CartOverlayItemStyles.scss";

/** This is a decribtion for the AttributeItems component
 * this is responsible for listing the options for each product
 * @function isChecked - returns true or false according to checking whether certain option was checked or not for styling purpose
 * @function handleInput - sets the selected Option for a certain attribute for the item
 */

class AttributeItems extends Component {
  isChecked(val, itemsName) {
    const { selectedOptions } = this.props;
    return selectedOptions.some((attr) => {
      return attr.userSelection === val && itemsName === attr.attributeName;
    });
  }
  handleInput(e) {
    const { name, value } = e.target;
    const {selectedOptions}=this.props
    const editedAttributes = selectedOptions.map((attr) => {
      if (attr.attributeName === name) {
        attr.userSelection = value;
      }
      return attr;
    });
    if(this.props.parentComponent==="projectDetails") this.props.handleSelectedOptions(editedAttributes);
  }
  render() {
    const { items, itemsName, productId, itemType, componentWrapper } =
      this.props;
    return (
      <div>
        <ul className={`${componentWrapper}__attr-row`}>
          {items.map((item, j) => {
            return (
              <li key={j} className={`${componentWrapper}__attr-item`}>
                <div
                  className={
                    this.isChecked(item.value, `${itemsName} ${productId}`)
                      ? "inputChecked"
                      : ""
                  }
                >
                  <input
                    id={`${itemsName}/${item.value}`}
                    type="radio"
                    name={`${itemsName} ${productId}`}
                    value={item.value}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <label
                    className="custom-radio"
                    htmlFor={`${itemsName}/${item.value}`}
                    id={itemType === "swatch" ? "swatch" : ""}
                    style={
                      itemType === "swatch"
                        ? { backgroundColor: item.value }
                        : null
                    }
                  >
                    {itemType !== "swatch" ? item.displayValue : ""}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AttributeItems;
