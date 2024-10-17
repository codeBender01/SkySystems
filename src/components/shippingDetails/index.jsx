import React from 'react';
import styles from './shipping.module.scss';
import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Shipping = ({ setStep, handleChange }) => {

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.editLink}>
        <h2> <FaCheck /> Contact information </h2>
        <FaRegEdit style={{width:'20px', height: '20px', color: '#808080'}} />
      </div>
      <h2>2 Shipping Details</h2>
      <form onSubmit={handleContinueToPayment}>
        <input style={{width: '50%'}} type="text" name="recipients_name" placeholder="Recipient's Name" onChange={handleChange} required />
        <input style={{width: '50%'}} type="tel" name="recipients_phone" placeholder="Recipient's Phone number" onChange={handleChange} required />
        <input type="date" name="dateOfDelivery" placeholder="Date of Delivery" onChange={handleChange} />
        <input type="time" name="timeOfDelivery" placeholder="Delivery Time" onChange={handleChange} />
        <div>
          <input style={{width: '50%'}} type="text" name="street" placeholder="Street" onChange={handleChange} />
          <input style={{width: '50%'}} type="text" name="appartmentNumber" placeholder="Apartment Number" onChange={handleChange} />
        </div>
        <label>
          <input type="checkbox" name="callRecipient" onChange={handleChange} /> I don't know the address, please call the recipient.
        </label>
        <button type="submit">Continue to Payment</button>
        <div className={styles.line}></div>
        <p>3 Payment</p>
        <div className={styles.line}></div>
      </form>
    </div>
  );
};

export default Shipping;
