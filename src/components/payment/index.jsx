import React from "react";
import styles from "./payment.module.scss";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Payment = ({ handleCreateOrder, handleChange }) => {
  return (
    <div className={styles.formSection}>
      <div className={styles.editLink}>
        <h2>
          {" "}
          <FaCheck /> Contact information{" "}
        </h2>
        <FaRegEdit
          style={{ width: "20px", height: "20px", color: "#808080" }}
        />
      </div>
      <div className={styles.editLink}>
        <h2>
          {" "}
          <FaCheck /> Shipping details
        </h2>
        <FaRegEdit
          style={{ width: "20px", height: "20px", color: "#808080" }}
        />
      </div>
      <h2>3 Payment</h2>
      <p style={{ fontSize: "16px", color: "#000", margin: "16px 0 16px 0" }}>
        Pay by card. Your payment is secure.
      </p>
      <form onSubmit={handleCreateOrder}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          onChange={handleChange}
          required
        />
        <div className={styles.cards}>
          <input
            style={{ width: "50%" }}
            type="text"
            name="expiryDate"
            placeholder="MM / YY"
            onChange={handleChange}
            required
          />
          <input
            style={{ width: "50%" }}
            type="text"
            name="cvv"
            placeholder="CVV Code"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Make a Purchase</button>
      </form>
      <p style={{ fontSize: "16px", color: "#000", margin: "16px 0 16px 0" }}>
        Or pay using:
      </p>
      <div className={styles.alternativePayment}>
        <button className={styles.applePay}>
          <FaApple /> Apple Pay
        </button>
        <button className={styles.googlePay}>
          {" "}
          <FcGoogle />
          Google Pay
        </button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default Payment;
