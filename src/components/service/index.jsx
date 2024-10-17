import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./service.module.scss";
import eagle from "../../assets/eagle.jpg";
import jewel from "../../assets/jewel.png";

gsap.registerPlugin(ScrollTrigger);

function Service() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const imageRef = useRef(null);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    const imageAnimation = gsap.fromTo(
      imageRef.current,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 70%",
          end: "bottom 0%",
          toggleActions: mobile
            ? "play none none none"
            : "play reverse play reverse",
        },
      }
    );

    const rightColumnAnimation = gsap.fromTo(
      rightColumnRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 70%",
          end: "bottom 0%",
          toggleActions: mobile
            ? "play none none none"
            : "play reverse play reverse",
        },
      }
    );

    // Cleanup function
    return () => {
      imageAnimation.kill();
      rightColumnAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mobile]);

  return (
    <>
      <section className={styles.service} id="service">
        <div className={styles.head}>
          <h1>Our Service</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.leftColumn} ref={leftColumnRef}>
            <img src={jewel} alt="jewel" ref={imageRef} />
          </div>
          <div className={styles.rightColumn} ref={rightColumnRef}>
            <span>CATALOUGE</span>
            <h1>Download Catalogue</h1>
            <p>
              Our company have "SKY SYSTEMS" and "Dandelion" jewelry rope brand.
              The company has its own R&D team, production and processing
              workshop, hand knitting personnel; More products have patent
              certificate and can be tested by environmental protection tests.
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>
        <div className={styles.eagleService}>
          <div className={styles.eagleJewel}>
            <span>service</span>
            <h1>Booth in Jewelry Show</h1>
            <p>
              We are participating since over 25 Years in the biggest and most
              precious Exhibitions Worldwide. If you want to visit us or get
              informed where we have a booth next, feel free to contact us or
              follow us on Social Media to see updates.
            </p>
          </div>
          <div className={styles.eagleFrame}>
            <img src={eagle} alt="eagle" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;
