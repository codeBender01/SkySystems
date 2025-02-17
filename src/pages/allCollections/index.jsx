import { Link, useNavigate } from "react-router-dom";

import styles from "../allProducts/allProducts.module.scss";

import { useGetAllClientCollectionsQuery } from "../../store/services/clientCols";

import productimg from "../../assets/2.png";

function AllCollections() {
  const navigate = useNavigate();

  const { data: cols } = useGetAllClientCollectionsQuery();

  return (
    <>
      <div className={styles.App}>
        <h1>All Collections</h1>
        <div className={styles.gridContainer}>
          {cols && cols.collections
            ? cols.collections.map((col) => (
                <div
                  onClick={() => navigate("/items/allProducts")}
                  className={styles.productCard}
                  key={col.id}
                >
                  <div className={styles.productInfo}>
                    <h3>{col.options[0].title}</h3>
                    <p>{col.products.length} product(s)</p>
                  </div>
                  <div className={styles.frame}>
                    <Link to={`/allProducts`} state={{ col }}>
                      <img src={productimg} alt={col.options[0].title} />
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

export default AllCollections;
