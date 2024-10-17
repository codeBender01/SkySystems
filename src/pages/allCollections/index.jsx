import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import { getClientCollections } from "../../store/clientCollections";

import ProductHeader from "../../components/productHeader";
import Footer from "../../components/footer";

import styles from "../allProducts/allProducts.module.scss";

import productimg from "../../assets/2.png";

function AllCollections() {
  const { categoryTitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collections = useSelector(
    (state) => state.clientCollections.clientCollections
  );

  useEffect(() => {
    dispatch(getClientCollections());
  }, []);

  return (
    <>
      <div className={styles.App}>
        <h1>All Collections</h1>
        <div className={styles.gridContainer}>
          {collections.map((col) => (
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
          ))}
        </div>
      </div>
    </>
  );
}

export default AllCollections;