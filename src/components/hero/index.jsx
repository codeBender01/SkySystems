import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import { gsap } from "gsap";
import styles from "./hero.module.scss";
import { Link } from "react-router-dom";

import Rectangle1 from "../../assets/Rectangle1.png";
import Rectangle2 from "../../assets/Rectangle2.png";
import Rectangle3 from "../../assets/Rectangle3.png";

import "swiper/css";

function Hero() {
  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    const photos = document.querySelectorAll(`.${styles.photos} div`);

    // Desktop animation
    gsap.fromTo(
      photos,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        stagger: 0.4,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.center}>
        <h1>Our latest arrivals</h1>
        <span>
          Check out all our new
          <br /> arrivals!
        </span>
        <Link to={"/items/allProducts"}>
          <button>Shop all</button>
        </Link>
      </div>

      {mobile ? (
        <Swiper
          autoplay
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          className="w-[100%]"
        >
          <SwiperSlide>
            <div className="flex items-center justify-center">
              <img
                src={Rectangle1}
                alt="Rectangle 1"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center">
              <img
                src={Rectangle2}
                alt="Rectangle 2"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center">
              <img
                src={Rectangle3}
                alt="Rectangle 3"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className={styles.photos}>
          <div>
            <img src={Rectangle1} alt="Rectangle 1" />
          </div>
          <div>
            <img src={Rectangle2} alt="Rectangle 2" />
          </div>
          <div>
            <img src={Rectangle3} alt="Rectangle 3" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
