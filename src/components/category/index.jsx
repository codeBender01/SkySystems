import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./category.module.scss";
import { FaRegRegistered } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import carditem1 from "../../assets/1.png";
import carditem2 from "../../assets/2.png";
import carditem3 from "../../assets/3.png";
import carditem4 from "../../assets/4.png";
import decor from "../../assets/decorcolum.png";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Category Title1",
    imageUrl: carditem1,
    buttonText: "Shop now",
  },
  {
    title: "Category Title2",
    imageUrl: carditem2,
    buttonText: "Shop now",
  },
  {
    title: "Category Title3",
    imageUrl: carditem3,
    buttonText: "Shop now",
  },
  {
    title: "Category Title4",
    imageUrl: carditem4,
    buttonText: "Shop now",
  },
  {
    title: "Category Title5",
    imageUrl: carditem1,
    buttonText: "Shop now",
  },
];

function Category() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    const leftColumnElements = leftColumnRef.current.children;
    const rightColumnElements = rightColumnRef.current.children;

    const leftColumnAnimation = gsap.fromTo(
      leftColumnElements,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 100%",
          end: "bottom 0%",
          toggleActions: mobile
            ? "play none none none"
            : "play complete reverse reset",
        },
      }
    );

    const rightColumnAnimation = gsap.fromTo(
      rightColumnElements,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 70%",
          end: "bottom 70%",
          toggleActions: mobile
            ? "play none none none"
            : "play complete reverse reset",
        },
      }
    );

    // Cleanup function
    return () => {
      leftColumnAnimation.kill();
      rightColumnAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mobile]);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.leftColumn} ref={leftColumnRef}>
          <div className={styles.leftColumn__head}>
            <h1>
              Sky System <FaRegRegistered />
            </h1>
            <p>
              Since 1993 "Sky Systems" is focused on creating and designing the
              best available quality Materials for Jewelry.
            </p>
            <hr />
          </div>
          <div className={styles.leftColumn__image}>
            <div>
              <img src={decor} alt="" />
            </div>
            <div style={{ width: "280px", alignItems: "end" }}>
              Since 1993 "Sky Systems" is focused on creating and designing the
              best available quality Materials for Jewelry.
            </div>
          </div>
        </div>
        <div className={`${styles.rightColumn} bg-white`} ref={rightColumnRef}>
          {categories.map((category, index) => (
            <div className={styles.categoryCard} key={index}>
              <div className={styles.categoryCard__frame}>
                <Link to={`/categoryProducts/${category.title}`}>
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className={styles.Catimage}
                  />
                </Link>
              </div>
              <div className={styles.categoryCard__shop}>
                <h2 className={styles.categoryCard__title}>{category.title}</h2>
                <Link to={`/categoryProducts/${category.title}`}>
                  <span className={styles.categoryCard__button}>
                    {index % 2 === 1 ? (
                      <FaArrowLeftLong className={styles.arrowleft} />
                    ) : null}
                    {category.buttonText}
                    {index % 2 === 0 ? (
                      <FaArrowRightLong className={styles.arrowright} />
                    ) : null}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
}

export default Category;
