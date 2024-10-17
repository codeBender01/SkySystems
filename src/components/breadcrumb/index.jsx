import React from 'react';
import styles from './breadcrumb.module.scss';
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ step }) => {
  const isCompleted = (currentStep) => {
    const steps = ['contact', 'shipping', 'payment'];
    return steps.indexOf(step) > steps.indexOf(currentStep);
  };

  return (
    <div className={styles.breadcrumb}>
      <div className={`${styles.step} ${step === 'contact' || isCompleted('contact') ? styles.active : ''}`}>
        <span className={styles.stepLabel}>information <IoIosArrowForward /></span>
        {isCompleted('contact') && <span className={styles.editIcon}></span>}
      </div>
      <div className={`${styles.step} ${step === 'shipping' || isCompleted('shipping') ? styles.active : ''}`}>
        <span className={styles.stepLabel}>Shipping<IoIosArrowForward /></span>
        {isCompleted('shipping') && <span className={styles.editIcon}></span>}
      </div>
      <div className={`${styles.step} ${step === 'payment' ? styles.active : ''}`}>
        <span className={styles.stepLabel}>Payment <IoIosArrowForward /></span>
      </div>
    </div>
  );
};

export default Breadcrumb;
