"use client";
import React from "react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { addCart, removeCartItem, removeQuantity } from "../GlobalRedux/Features/counter/counterSlice";

const Cart = () => {
  const reduxProducts = useSelector((state: RootState) => state.productRed);
  const dispatch = useDispatch();

  return (
    <section className={styles.cartSection}>
      <div className={styles.cartCntr}>
        <div>
          <h3>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
              </svg>
            </span>
            Shopping Cart
          </h3>

          <div className={styles.cartDetailCntr}>
            {reduxProducts.cart.map((item: any) => {
              return (
                <div className={styles.cartCard} key={`item_+${item.id}`}>
                  <div className={styles.cartImg}>
                    <img src={item.imageURL} alt="cart Image" />
                  </div>

                  <div className={styles.cartDetail}>
                    <div className={styles.cartHeader}>
                      <h6>{item.name}</h6>
                      <p>₹{item.price}</p>
                    </div>

                    <div className={styles.cartCta}>
                      <div className={styles.toggleQty}>
                        <button onClick={() => dispatch(removeQuantity(item))}>-</button>
                        <p>{item.cartQty}</p>
                        <button onClick={() => dispatch(addCart(item))}>+</button>
                      </div>
                      <button className={styles.deleteItem} onClick={() => dispatch(removeCartItem(item))}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${styles.cartTotal} objCenter`}>
          {reduxProducts.cart.length > 0 ? (
            <p>
              <span>Total Amount </span> ₹ {reduxProducts.cart.reduce((acc, curr: any) => acc + curr.price * curr.cartQty, 0)}
            </p>
          ) : (
            <p>
              <span>Cart is Empty</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
