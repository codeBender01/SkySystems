import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.scss";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    const leftColumnAnimation = gsap.fromTo(
      leftColumnRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 70%",
          end: "bottom 70%",
          toggleActions: mobile
            ? "play none none none"
            : "play none none reverse",
        },
      }
    );

    const rightColumnAnimation = gsap.fromTo(
      rightColumnRef.current.children,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 70%",
          end: "bottom 0%",
          toggleActions: mobile
            ? "play none none none"
            : "play none none reverse",
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
      <div className={styles.about} id="about">
        <div className={styles.leftColumn} ref={leftColumnRef}>
          <h2>About us</h2>
        </div>
        <div className={styles.rightColumn} ref={rightColumnRef}>
          <span>Our Story</span>
          <h2>Get Closer</h2>
          <p>
            SkySystems was founded back in 1993 by Kemal Kandasi and his wife
            Elizabeth Kandasi. The whole journey started in Linz, Austria where
            both of them studied and from there they built up today's company
            which is market leader in jewelry and jeweler materials with their
            discipline and efforts. Today Skysystems has several locations and
            factories worldwide. The main goal back then was to give the jewelry
            world the easiest way to materials through one supplier and today
            the same attention is paid as back then and the whole extended Sky
            team is running to help our customers happily and successfully.
          </p>
          <div>
            <button>Learn More</button>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
}

export default About;
