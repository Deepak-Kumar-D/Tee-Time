"use client";
import { addCart } from "@/app/GlobalRedux/Features/counter/counterSlice";
import { RootState } from "@/app/GlobalRedux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsCntr = () => {
  const reduxProducts = useSelector((state: RootState) => state.productRed);
  const dispatch = useDispatch();

  return (
    <section className="productsCntr">
      {!reduxProducts.filteredProducts.length && (
        <div className="products-info">
          <p>No products found</p>
        </div>
      )}

      {reduxProducts.filteredProducts.map((product: any, index: any) => {
        return (
          <div className="productCard" key={`product_${index}`}>
            <div className="productImg">
              <img src={product.imageURL} alt={product.name} />
            </div>

            <div className="productAddCntr flexRowSBC">
              <h6>{product.name}</h6>
              <button onClick={() => dispatch(addCart(product))}>
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
