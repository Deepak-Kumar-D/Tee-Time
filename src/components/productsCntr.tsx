"use client";
import React, { useEffect, useState } from "react";

const ProductsCntr = (props: any) => {
  const { products } = props;
  return (
    <section className="productsCntr">
      {!products.length && (
        <div className="products-info">
          <p>No products found</p>
        </div>
      )}

      {products.map((product: any, index: any) => {
        return (
          <div className="productCard" key={`product_${index}`}>
            <div className="productImg">
              <img src={product.imageURL} alt={product.name} />
            </div>

            <div className="productAddCntr flexRowSBC">
              <h6>{product.name}</h6>
              <button>
                ₹{product.price} <span>ADD</span>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProductsCntr;
