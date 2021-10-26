import React, { Component } from 'react';
import * as Dummy from "../utils/dummy.json"
import ProductItem from './ProductItem';
import "../styles/ProductsGridStyles.scss"
class ProductsGrid extends Component {
    render() {
        return (
            <div className="product-grid-wrapper">
                {
                    Dummy.products.map((item,i)=>(
                        <ProductItem key={i} product={item}/>
                    ))
                }
                
            </div>
        );
    }
}

export default ProductsGrid;
