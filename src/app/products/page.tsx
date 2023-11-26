"use client";
import React, { Fragment, useEffect, useState } from "react";
import ProductsCntr from "../../components/productsCntr";
import styles from "./page.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, addFilter, resetFilters, searchItem } from "../GlobalRedux/Features/counter/counterSlice";
import { RootState } from "../GlobalRedux/store";

const Products = () => {
  const reduxProducts = useSelector((state: RootState) => state.productRed);
  const dispatch = useDispatch();
  const [colors, setColors] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [filters, setFilters] = useState({ gender: "", colours: [] as any, price: "", type: [] as any });
  const [openFilter, setOpenFilter] = useState(false);

  const selectFilter = (type: any, option: any) => {
    let tempFilters = { ...filters };

    if (type === "gender") {
      tempFilters.gender = option;
      setFilters(tempFilters);
    } else if (type === "colour") {
      let colourIndx = tempFilters.colours.findIndex((ele: any) => ele === option);

      if (colourIndx > -1) {
        tempFilters.colours.splice(colourIndx, 1);
        setFilters(tempFilters);
      } else {
        tempFilters.colours.push(option);
        setFilters(tempFilters);
      }
    } else if (type === "type") {
      let typeIndx = tempFilters.type.findIndex((ele: any) => ele === option);

      if (typeIndx > -1) {
        tempFilters.type.splice(typeIndx, 1);
        setFilters(tempFilters);
      } else {
        tempFilters.type.push(option);
        setFilters(tempFilters);
      }
    } else if (type === "price") {
      tempFilters.price = option;
      setFilters(tempFilters);
    }

    filterProducts(tempFilters);
  };

  const filterProducts = (tempFilters: any) => {
    let arr = new Array();
    let tempFiltered = new Array();

    if (tempFilters.gender) {
      arr = reduxProducts.products.filter((prod: any) => prod.gender.toLowerCase() === tempFilters.gender);
    } else {
      arr = [...reduxProducts.products];
    }

    if (tempFilters.price) {
      let rangeP = tempFilters.price.split("-");
      let range1 = Number(rangeP[0].replace("₹", ""));
      let range2 = Number(rangeP[1].replace("₹", ""));

      arr = arr.filter((prod) => prod.price >= range1 && prod.price <= range2);
    } else if (!tempFilters.gender) {
      arr = [...reduxProducts.products];
    }

    if (tempFilters.colours.length) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < tempFilters.colours.length; j++) {
          if (arr[i].color === tempFilters.colours[j]) {
            if (tempFilters.type.length) {
              for (let k = 0; k < tempFilters.type.length; k++) {
                if (arr[i].type === tempFilters.type[k]) {
                  tempFiltered.push(arr[i]);
                }
              }
            } else {
              tempFiltered.push(arr[i]);
            }
          }
        }
      }
    }

    if (!tempFilters.colours.length && tempFilters.type.length) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < tempFilters.type.length; j++) {
          if (arr[i].type === tempFilters.type[j]) {
            tempFiltered.push(arr[i]);
          }
        }
      }
    }

    if (tempFiltered.length) {
      dispatch(addFilter(tempFiltered));
    } else if ((tempFilters.gender || tempFilters.price) && !tempFilters.colours.length && !tempFilters.type.length) {
      dispatch(addFilter(arr));
    } else {
      dispatch(addFilter([]));
    }
  };

  const handleResetFilters = () => {
    setFilters({ gender: "", colours: [] as any, price: "", type: [] as any });
    dispatch(resetFilters());
    document.querySelectorAll("input[type=checkbox]").forEach((el: any) => (el.checked = false));
    document.querySelectorAll("input[type=radio]").forEach((el: any) => (el.checked = false));
  };

  const searchProduct = (event: any) => {
    dispatch(searchItem(event.target.value.toLowerCase()));
  };

  const getProducts = async () => {
    try {
      const resp = await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
      const tempProducts = await resp.json();
      dispatch(addProduct(tempProducts));

      let tempColours = [];
      let tempTypes = [];

      for (let i = 0; i < tempProducts.length; i++) {
        let checkColor = tempColours.find((ele: any) => ele === tempProducts[i].color);
        if (!checkColor) tempColours.push(tempProducts[i].color);

        let checkType = tempTypes.find((ele: any) => ele === tempProducts[i].type);
        if (!checkType) tempTypes.push(tempProducts[i].type);
      }

      setColors(tempColours);
      setTypes(tempTypes);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={`${styles.productsPg}`}>
      <div className={styles.respHeader}>
        <div onClick={() => setOpenFilter(!openFilter)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="filter">
            <path fill="#000" fill-rule="evenodd" d="M20 5h-1.17a3.001 3.001 0 0 0-5.66 0H4a1 1 0 0 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2zm-4 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 12a1 1 0 0 1 1-1h1.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-9.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1-1-1zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-1.17a3.001 3.001 0 0 0-5.66 0H4zm13 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" clip-rule="evenodd"></path>
          </svg>
        </div>

        <div className={`${styles.searchCntr} flexRowSBC`}>
          <input type="text" onKeyUp={searchProduct} />
          <span>🔍</span>
        </div>
      </div>

      <div className={`${styles.filterCntr}`}>{filterComponent()}</div>

      <div className={`${styles.respFilterCntr} ${openFilter ? styles.openFilter : styles.closeFilter}`}>{filterComponent()}</div>

      <ProductsCntr />
    </section>
  );

  function filterComponent() {
    return (
      <Fragment>
        <p className={styles.closeFilterIcon} onClick={() => setOpenFilter(!openFilter)}>
          🆇
        </p>
        <h4>
          Filter Products <span onClick={handleResetFilters}>Reset</span>
        </h4>
        <div className={`${styles.filterSubCntr}`}>
          <div className={`${styles.filterArea}`}>
            <h5>Gender</h5>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="men" name="gender" value="men" onChange={(e) => selectFilter("gender", e.target.value)} />
              <label htmlFor="men">Men</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="women" name="gender" value="women" onChange={(e) => selectFilter("gender", e.target.value)} />
              <label htmlFor="women">Women</label>
            </div>
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Colour</h5>

            {colors.map((color, indx) => {
              return (
                <div className={`${styles.filterType}`} key={`color_+${indx}`}>
                  <input type="checkbox" id={color} name={color} onChange={() => selectFilter("colour", color)} />
                  <label htmlFor={color}>{color}</label>
                </div>
              );
            })}
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Price Range</h5>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price1" name="price" value="₹0 - ₹300" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price1">₹0 - ₹300</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price2" name="price" value="₹300 - ₹500" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price2">₹300 - ₹500</label>
            </div>

            <div className={`${styles.filterType}`}>
              <input type="radio" id="price3" name="price" value="₹500 - ₹1000" onChange={(e) => selectFilter("price", e.target.value)} />
              <label htmlFor="price3">₹500 - ₹1000</label>
            </div>
          </div>

          <div className={`${styles.filterArea}`}>
            <h5>Type</h5>

            {types.map((type, indx) => {
              return (
                <div className={`${styles.filterType}`} key={`type_+${indx}`}>
                  <input type="checkbox" id={type} name={type} onChange={() => selectFilter("type", type)} />
                  <label htmlFor={type}>{type}</label>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Products;
