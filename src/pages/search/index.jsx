import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProductHeader from "../../components/productHeader";
import Footer from "../../components/footer";
import styles from "./search.module.scss";

function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();

  const products = [];

  return (
    <>
      <ProductHeader />
      <div className={styles.App}>
        <h1>Search Results for "{searchTerm}"</h1>
        <div className={styles.gridContainer}>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <div className={styles.productCard} key={product.id}>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <Link
                    to={`/product/${product.category}/${product.id}`}
                    state={{ product }}
                  >
                    Shop now →
                  </Link>
                </div>
                <div className={styles.frame}>
                  <Link
                    to={`/product/${product.category}/${product.id}`}
                    state={{ product }}
                  >
                    <img src="src/assets/2.png" alt={product.name} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
