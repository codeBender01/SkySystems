import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa";
import { AiOutlinePinterest } from "react-icons/ai";
import { LuFacebook } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";
import { LiaTelegram } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./contact.module.scss";
import store from "../../assets/store.png";

import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const leftColumnRef = useRef(null);
  const imageColumnRef = useRef(null);
  const imageRef = useRef(null);

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
            : "play reverse play reverse",
        },
      }
    );

    const imageAnimation = gsap.fromTo(
      imageRef.current,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imageColumnRef.current,
          start: "top 70%",
          end: "bottom 100%",
          toggleActions: mobile
            ? "play none none none"
            : "play reverse play reverse",
        },
      }
    );

    // Cleanup function
    return () => {
      leftColumnAnimation.kill();
      imageAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mobile]);

  return (
    <>
      <div className={styles.contact} id="contact">
        <div className={styles.leftColumn} ref={leftColumnRef}>
          <div className={styles.leftColumn__head}>
            <h2>To contact us</h2>
            <p>We will call you back</p>
            <div>
              <input
                type="text"
                name=""
                id=""
                placeholder="+380  XXXX XXX XXX"
              />
              <button>Book a Call</button>
            </div>
          </div>
          <div className={styles.leftColumn__bottom}>
            <div className={styles.leftColumn__phone}>
              <h1>Phone</h1>
              <div className={styles.leftColumn__text}>
                <p>+77777777</p>
                <p>+77777777</p>
              </div>
            </div>
            <div className={styles.leftColumn__address}>
              <h1>Address</h1>
              <div className={styles.leftColumn__text}>
                <h3>opening hours: 8 to 11 p.m.</h3>
                <div>
                  <IoLocationOutline />
                  <p>
                    Sky Systems Istanbul - Mollafenari, Mesih Mehmet Paşa Sk.
                    No:10, 34120 Fatih/İstanbul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageColumn} ref={imageColumnRef}>
          <div className={styles.imgFrame}>
            <img src={store} alt="store" ref={imageRef} />
          </div>
          <div className={styles.social}>
            <div>
              <p>Shop in Istanbul</p>
            </div>
            <div className={styles.social__icons}>
              <FaInstagram />
              <AiOutlinePinterest />
              <LuFacebook />
              <SlSocialTwitter />
              <LiaTelegram />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
