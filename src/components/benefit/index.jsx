import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./benefit.module.scss";

gsap.registerPlugin(ScrollTrigger);

function Benefit() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftAnimation = gsap.fromTo(
      leftColumnRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 70%",
          end: "bottom 0%",
          toggleActions: mobile
            ? "play none none none"
            : "play complete reverse reset",
        },
      }
    );

    const rightAnimation = gsap.fromTo(
      rightColumnRef.current.children,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 60%",
          end: "bottom 60%",
          toggleActions: mobile
            ? "play none none none"
            : "play complete reverse reset",
        },
      }
    );

    // Recalculate on mount to avoid incorrect triggering
    ScrollTrigger.refresh();

    return () => {
      leftAnimation.kill();
      rightAnimation.kill();
    };
  }, [mobile]);

  return (
    <>
      <div className={styles.body} id="benefit">
        <div className={styles.leftColumn} ref={leftColumnRef}>
          <h2>Why choose us</h2>
        </div>
        <div className={styles.rightColumn} ref={rightColumnRef}>
          <div>
            <h2>Always on the run</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
          <hr style={{ width: "100%" }} />
          <div>
            <h2>On-time delivery</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
          <hr style={{ width: "100%" }} />
          <div>
            <h2>Safe payment</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
}

export default Benefit;
