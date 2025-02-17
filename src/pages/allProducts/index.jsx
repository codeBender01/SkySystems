import { Link } from "react-router-dom";

import styles from "./allProducts.module.scss";

import { useGetAllClientProductsQuery } from "../../store/services/clientProducts";

import productimg from "../../assets/2.png";

function AllProducts() {
  const { data: products } = useGetAllClientProductsQuery();

  return (
    <>
      <div className={styles.App}>
        <h1>All Products</h1>
        <div className={`${styles.gridContainer} mt-8`}>
          {products && products.products
            ? products.products.map((product) => (
                <div className={styles.productCard} key={product.id}>
                  <div className={styles.productInfo}>
                    <h3>{product.options[0]?.title}</h3>
                    <p>{product?.colors[0]?.sizes[0].price} TL</p>
                    <Link
                      to={`/items/product/${product.id}`}
                      state={{ product }}
                    >
                      Shop now →
                    </Link>
                  </div>
                  <div className={styles.frame}>
                    <Link
                      to={`/items/product/${product.id}`}
                      state={{ product }}
                    >
                      <img src={productimg} alt={product.options[0]?.title} />
                    </Link>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
