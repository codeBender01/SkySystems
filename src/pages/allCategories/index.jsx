import { useNavigate } from "react-router-dom";

import { useGetAllClientCategoriesQuery } from "../../store/services/clientCats";

import styles from "../allProducts/allProducts.module.scss";

import productimg from "../../assets/2.png";

function AllCategories() {
  const navigate = useNavigate();

  const { data: cats } = useGetAllClientCategoriesQuery();

  return (
    <>
      <div className={styles.App}>
        <h1>All Categories</h1>
        <div className={`${styles.gridContainer} mt-8`}>
          {cats
            ? cats.categories.map((cat) => (
                <div
                  onClick={() =>
                    navigate(
                      `/items/category-products/${cat.options[0].title}`,
                      {
                        state: cat.products,
                      }
                    )
                  }
                  className={styles.productCard}
                  key={cat.id}
                >
                  <div className={styles.productInfo}>
                    <h3>{cat.options[0].title}</h3>
                    <div>{cat.products.length} product(s)</div>
                  </div>
                  <div className={styles.frame}>
                    <img
                      src={cat.medias[0] ? cat.medias[0].filePath : productimg}
                      alt={cat.options[0].title}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default AllCategories;
