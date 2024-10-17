import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { message } from "antd";

import { getMyBasket, deleteFromBasket } from "../../store/basket";

import { MdLockOutline } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import img from "../../assets/Rectangle69.png";

import styles from "./checkout.module.scss";

const CheckoutForm = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const basket = useSelector((state) => state.basket.myBasket);
  const basketCount = useSelector((state) => state.basket.basketCount);

  const dispatch = useDispatch();

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  useEffect(() => {
    dispatch(getMyBasket());
  }, [pageUpdate]);

  const handleDeleteFromBasket = (id) => {
    dispatch(deleteFromBasket(id)).then((res) => {
      if (res.error && res.error.message === "Rejected") {
        messageApi.open({
          type: "error",
          content: "Error",
        });
        return;
      }
      setPageUpdate(true);
      messageApi.open({
        type: "success",
        content: "Success!",
      });
    });

    setTimeout(() => {
      setPageUpdate(false);
    }, 2000);
  };

  return (
    <div className="p-6 flex gap-4">
      {contextHolder}
      <div className="flex flex-col gap-4 w-[45%]">
        <div className="text-[32px] text-textGray">
          Cart Products ({basketCount})
        </div>
        <div className="bg-[#f5f5f7] p-4 rounded-md ">
          {basket.basketItems &&
            basket.basketItems.map((pr) => {
              return (
                <div
                  className={`${styles.orderSummary} border-[1px] border-darkGray p-2 rounded-md`}
                >
                  <div className="gap-4" style={{ display: "flex" }}>
                    <img src={img} alt="Snowfall" />
                    <div className="w-[50%]">
                      <div className="flex justify-between font-bold">
                        Product name:
                        <h3 className="font-medium">
                          {" "}
                          {pr.product.options[0].title}
                        </h3>
                      </div>
                      <div className="flex justify-between font-bold">
                        Product quantity:
                        <p className="font-medium"> {pr.quantity}</p>
                      </div>
                      <div className="flex justify-between font-bold">
                        Product size:
                        <p className="font-medium">{pr.size.size}</p>
                      </div>
                      <div className="flex justify-between font-bold">
                        Product color:
                        <p className="font-medium">
                          {pr.color.options[0].name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFromBasket(pr.id)}
                    className="bg-deleteRed text-white mt-2 p-2 rounded-md hover:opacity-85 duration-150"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.checkoutContainer}>
        <div
          className={`${styles.summarySection} ${
            showSummary ? styles.show : ""
          }`}
        >
          <h4>Order Summary</h4>

          <hr />
          <div className={styles.totalSection}>
            <p>If you have our gift card, enter the code to get discounts</p>
            <div className={styles.totalSection__gift}>
              <input type="text" placeholder="Gift card" />
              <button style={{ width: "50%" }}>Apply</button>
            </div>
            <div className={styles.subtotals}>
              <div>
                <p>Subtotal:</p>
                <p>Shipping:</p>
              </div>
              <div>
                <p>$100.00</p>
                <p>Calculated at next step</p>
              </div>
            </div>
            <hr />
            <div className={styles.subtotals__total}>
              <p>Total:</p>
              <p>$100.00</p>
            </div>
          </div>
          <div className={styles.secureCheckout}>
            <p>Secure Checkout</p> <MdLockOutline />
          </div>
        </div>
        <div className={styles.summaryTitle}>
          <button
            className={styles.toggleSummaryButton}
            onClick={toggleSummary}
          >
            <MdOutlineShoppingCart />
            {showSummary ? "Hide Order Summary" : "Show Order Summary"}{" "}
            {showSummary ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {!showSummary && <p>$100</p>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
