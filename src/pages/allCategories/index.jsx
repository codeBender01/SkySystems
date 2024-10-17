import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import { getClientCategories } from "../../store/clientCategories";

import styles from "../allProducts/allProducts.module.scss";

import productimg from "../../assets/2.png";

function AllCategories() {
  const { categoryTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(
    (state) => state.clientCategories.clientCategories
  );

  useEffect(() => {
    dispatch(getClientCategories());

    console.log(categories);
  }, []);

  return (
    <>
      <div className={styles.App}>
        <h1>All Categories</h1>
        <div className={`${styles.gridContainer} mt-8`}>
          {categories.map((cat) => (
            <div
              onClick={() =>
                navigate(`/items/category-products/${cat.options[0].title}`, {
                  state: cat.products,
                })
              }
              className={styles.productCard}
              key={cat.id}
            >
              <div className={styles.productInfo}>
                <h3>{cat.options[0].title}</h3>
                <div>{cat.products.length} product(s)</div>
              </div>
              <div className={styles.frame}>
                <img src={productimg} alt={cat.options[0].title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllCategories;
