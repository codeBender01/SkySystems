import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getCLientProducts } from "../../store/clientProducts";

import styles from "./allProducts.module.scss";

import productimg from "../../assets/2.png";

function AllProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.clientProducts.clientProducts);

  useEffect(() => {
    dispatch(getCLientProducts());
  }, []);

  return (
    <>
      <div className={styles.App}>
        <h1>All Products</h1>
        <div className={`${styles.gridContainer} mt-8`}>
          {products &&
            products.map((product) => (
              <div className={styles.productCard} key={product.id}>
                <div className={styles.productInfo}>
                  <h3>{product.options[0]?.title}</h3>
                  <p>{product?.colors[0]?.sizes[0].price} TL</p>
                  <Link to={`/items/product/${product.id}`} state={{ product }}>
                    Shop now →
                  </Link>
                </div>
                <div className={styles.frame}>
                  <Link to={`/items/product/${product.id}`} state={{ product }}>
                    <img src={productimg} alt={product.options[0]?.title} />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
