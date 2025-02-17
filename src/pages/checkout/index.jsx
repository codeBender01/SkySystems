import React, { useState, useEffect } from "react";

import { message } from "antd";

import { MdLockOutline } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import img from "../../assets/Rectangle69.png";

import { DatePicker, TimePicker, Checkbox } from "antd";

import dayjs from "dayjs";

import { Button } from "antd";

import styles from "./checkout.module.scss";
import {
  useGetMyBasketQuery,
  useDeleteFromBasketMutation,
  useOrderProductMutation,
} from "../../store/services/basketApi";

const CheckoutForm = () => {
  const { data: basket } = useGetMyBasketQuery();
  const [deleteFromBasket] = useDeleteFromBasketMutation();
  const [orderProduct] = useOrderProductMutation();
  const [data, setData] = useState({
    dateOfDelivery: "",
    deliveryTime: "",
    callRecipient: false,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [client, setClientInfo] = useState({});

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setClientInfo(JSON.parse(localStorage.getItem("client")));
  }, []);

  const handleDeleteFromBasket = async (id) => {
    const res = await deleteFromBasket(id);

    displayMessage(res);
  };

  useEffect(() => {
    if (data.dateOfDelivery === "" || data.deliveryTime === "") {
      setIsDisabled(true);
    } else [setIsDisabled(false)];
  }, [data]);

  const displayMessage = (res) => {
    if (res.data) {
      messageApi.success("Success!");
    } else if (res.error.status === 409) {
      messageApi.error("You already added this product!");
    }
  };

  const handleOrder = async () => {
    const res = await orderProduct({
      country: client.country,
      city: client.city,
      street: client.street,
      apartmentNumber: client.apartmentNumber,
      recipients_name: client.firstName,
      recipients_phone: client.phone,
      dateOfDelivery: data.dateOfDelivery,
      deliveryTime: data.deliveryTime,
      callRecipient: data.callRecipient,
      giftCard: "",
    });

    displayMessage(res);
  };

  return (
    <div className="p-6 flex gap-4">
      {contextHolder}
      <div className="flex flex-col gap-4 w-[45%]">
        <div className="text-[32px] text-textGray">
          Cart Products ({basket ? basket.basket.basketItems.length : 0})
        </div>
        <div className="bg-[#f5f5f7] p-4 rounded-md ">
          {basket && basket.basket.basketItems.length > 0
            ? basket.basket.basketItems.map((pr) => {
                return (
                  <div
                    key={pr.id}
                    className={`${styles.orderSummary} border-[1px] border-darkGray p-2 rounded-md`}
                  >
                    <div className="gap-4" style={{ display: "flex" }}>
                      <img
                        src={
                          pr.size.medias.length > 0
                            ? pr.size.medias[0].filePath
                            : img
                        }
                        alt="Snowfall"
                      />
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
              })
            : null}
        </div>

        <Button
          htmlType="submit"
          disabled={isDisabled}
          className="bg-blackMain text-white text-md uppercase w-[100%] py-6"
          onClick={handleOrder}
        >
          Order
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div>Please fill out this form before ordering</div>
        <div className="w-[300px]">
          <DatePicker.RangePicker
            className="w-[100%]"
            onChange={(val) => {
              setData({
                ...data,
                dateOfDelivery:
                  dayjs(val[0]).format("DD.MM.YYYY") +
                  "-" +
                  dayjs(val[1]).format("DD.MM.YYYY"),
              });
            }}
          />
        </div>
        <div className="w-[300px]">
          <TimePicker.RangePicker
            className="w-[100%]"
            onChange={(_, str) => {
              setData({
                ...data,
                deliveryTime: str[0] + "-" + str[1],
              });
            }}
            format={"HH:mm"}
          />
        </div>
        <div className="flex items-center flex-row-reverse gap-2">
          <div>I don't know the address, please call the recipient.</div>
          <Checkbox
            checked={data.callRecipient}
            onChange={(val) => {
              setData({
                ...data,
                callRecipient: val.target.checked,
              });
            }}
            title="I don't know the address, please call the recipient."
          />
        </div>
      </div>
      {/* <div className={styles.checkoutContainer}>
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
      </div> */}
    </div>
  );
};

export default CheckoutForm;
