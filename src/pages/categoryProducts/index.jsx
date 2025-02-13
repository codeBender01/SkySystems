import { useLocation, useNavigate } from "react-router-dom";

import styles from "./categoryProducts.module.scss";
import { Link, useParams } from "react-router-dom";

import categoryImg from "../../assets/2.png";

function CategoryProducts() {
  const { categoryTitle } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  return (
    <>
      <div className={styles.App}>
        <h1>{categoryTitle}</h1>
        <div className={`${styles.gridContainer} mt-8`}>
          {state.map((product) => (
            <div
              onClick={() =>
                navigate(`/items/product/${product.id}`, { state: product })
              }
              className={styles.productCard}
              key={product.id}
            >
              <div className={styles.productInfo}>
                <h3>{product.options[0].title}</h3>
                <p>{product.colors[0].sizes[0].price} TL</p>
                <p className="text-orangeLogo text-[14px] font-main underline cursor-pointer hover:opacity-85 duration-150">
                  Shop now →
                </p>
              </div>
              <div className={styles.frame}>
                <img
                  src={
                    product.sizes && product.sizes.medias[0]
                      ? product.sizes.medias[0].filePath
                      : categoryImg
                  }
                  alt={product.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
