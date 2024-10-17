import styles from "./footer.module.scss";
import { FaInstagram } from "react-icons/fa";
import { AiOutlinePinterest } from "react-icons/ai";
import { LuFacebook } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";
import { LiaTelegram } from "react-icons/lia";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.mail}>
          <p>
            For Wholesale prices and details please send us and E-mail in the
            Contact form down below with the{" "}
            <strong> Following requirements:</strong> Company Name, First and
            Last Name, Quantity and Product interested in, Mobile Number (
            Whatsapp ) or send us an E-mail to{" "}
            <strong>"office@skysystems.com.tr"</strong>
          </p>
          <input type="mail" placeholder="Your email" />
          <button>Send</button>
        </div>

        <div className={styles.contact}>
          <h3>Contact us </h3>
          <p>Address Line</p>
          <span>Phone:</span>
          <p>+7777777777</p>
          <span>General Enquiry</span>
          <p>skysystems@gmail.com</p>
          <h3>Follow us:</h3>
          <div className={styles.contact__icons}>
            {" "}
            <FaInstagram />
            <AiOutlinePinterest />
            <LuFacebook />
            <SlSocialTwitter />
            <LiaTelegram />{" "}
          </div>
        </div>
        <div className={styles.popularLinks}>
          <h3>Popular Links</h3>
          <p>All Products</p>
          <p>Home</p>
          <p>Products</p>
          <p>Findings</p>
          <p>Accessories</p>
          <p>About Us</p>
          <p>Catalouges</p>
          <h3>Service</h3>
          <p>Contact us</p>
          <p>About us</p>
        </div>

        <div className={styles.policies}>
          <h3>Policies</h3>
          <Link to={"/terms-conditions"}>
            <p>Terms & Conditions</p>
          </Link>
          <Link to={"/privacy-policy"}>
            <p>Privacy policy</p>
          </Link>
          <Link to={"/shipping-policy"}>
            <p style={{ marginTop: "25px" }}>Shipping & returns</p>
          </Link>
          <p>Terms & conditions</p>
          <p>Privacy policy</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
