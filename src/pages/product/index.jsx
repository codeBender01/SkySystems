import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { message, Button } from "antd";

import cartItem from "../../assets/carditem.png";
import color from "../../assets/productSmall.png";
import productBig from "../../assets/productBig.png";

import {
  useAddToBasketMutation,
  useGetOneClientProductBasketQuery,
} from "../../store/services/basketApi";

import "./product.scss";
import "swiper/css/navigation";
import "swiper/css";

const ProductPage = () => {
  const { categoryTitle, productId } = useParams();
  const [addToBasket] = useAddToBasketMutation();

  const { data: oneProduct } = useGetOneClientProductBasketQuery(productId);

  const location = useLocation();
  const product = location.state;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("23479");
  const [selectedImage, setSelectedImage] = useState(productBig);
  const [clientInfo, setClientInfo] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setClientInfo(JSON.parse(localStorage.getItem("client")));
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setSelectedImage(
        oneProduct.product?.colors[0]?.sizes[0]?.medias[0]?.filePath
          ? oneProduct.product?.colors[0]?.sizes[0]?.medias[0]?.filePath
          : productBig
      );
    }
  }, [oneProduct, clientInfo]);

  const colors = [
    { id: "23479", name: "Color 1", image: color },
    { id: "23480", name: "Color 2", image: color },
    { id: "23481", name: "Color 3", image: color },
    { id: "23482", name: "Color 4", image: color },
    { id: "23483", name: "Color 5", image: color },
    { id: "23484", name: "Color 6", image: color },
    { id: "23485", name: "Color 7", image: color },
    { id: "23486", name: "Color 8", image: color },
    { id: "23487", name: "Color 9", image: color },
    { id: "23488", name: "Color 10", image: color },
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color.id);
    setSelectedImage(color.image);
  };

  const displayMessage = (res) => {
    if (res.data) {
      messageApi.success("Success!");
    } else if (res.error.status === 409) {
      messageApi.error("You already added this product!");
    }
  };

  const handleAddToBasket = async () => {
    const res = await addToBasket({
      quantity: quantity,
      colorId: product?.product?.colors[0]?.id,
      sizeId: product?.product?.colors[0]?.sizes[0]?.id,
      productId: productId,
    });

    displayMessage(res);
  };

  return (
    <div className="product-page mt-2">
      {contextHolder}
      <main>
        <div className="product-details">
          <div className="w-[100%] md:w-[50%] h-[550px] mb-2">
            <img
              src={selectedImage}
              className="w-[100%] object-contain h-[100%]"
              alt="Product"
            />
          </div>
          <div className="details flex flex-col gap-4 mb-2">
            <span>{oneProduct?.product?.options[0]?.title}</span>
            <h1>
              {oneProduct?.product?.options[0]?.title} -{" "}
              {oneProduct?.product?.colors[0]?.sizes[0]?.price}TL
            </h1>

            <div className="quantity">
              <span>Quantity</span>
              <div className="inputStep flex items-center">
                <button
                  style={{ borderRight: "1px solid" }}
                  onClick={() => {
                    if (quantity === 1) {
                      return;
                    }
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <input
                  className="flex items-center justify-center "
                  type="number"
                  value={quantity}
                  readOnly
                />
                <button
                  style={{ borderLeft: "1px solid" }}
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <p>Minimal quantity - 1</p>

            <p>
              In stock - {oneProduct?.product?.colors[0]?.sizes[0]?.quantity}
            </p>
            <p className="mb-6">Minimal order sum - 400$</p>
            <div className="cardItems mt-10">
              <div className="variables">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={10}
                  slidesPerView={5}
                  slidesPerGroup={1}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    0: {
                      spaceBetween: 10,
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                    },
                    520: {
                      slidesPerView: 5,
                      slidesPerGroup: 1,
                    },
                  }}
                >
                  {oneProduct && oneProduct.colors
                    ? oneProduct.product.colors[0].sizes[0].medias.map(
                        (color) => (
                          <SwiperSlide key={color.id}>
                            <img
                              src={color.filePath}
                              alt={color.name}
                              className={
                                selectedColor === color.id ? "selected" : ""
                              }
                              onClick={() => handleColorClick(color)}
                            />
                          </SwiperSlide>
                        )
                      )
                    : null}
                </Swiper>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
              <Button
                onClick={handleAddToBasket}
                disabled={
                  oneProduct?.product?.colors[0]?.sizes[0]?.quantity === 0
                }
                className="w-[80%] hover:opacity-85 duration-200 px-[20px] py-[20px] bg-[black] text-white text-[18px]"
              >
                Add to Basket
              </Button>
            </div>
          </div>
        </div>

        <div className="suggestions">
          <h2 style={{ textAlign: "center" }}>You may also like...</h2>
          <div className="suggested-products">
            <div className="product-card">
              <img src={cartItem} alt="" />
            </div>
            <div className="product-card">
              <img src={cartItem} alt="" />
            </div>
            <div className="product-card">
              <img src={cartItem} alt="" />
            </div>
            <div className="product-card">
              <img src={cartItem} alt="" />
            </div>
          </div>
        </div>
      </main>
      <div>jjj</div>
    </div>
  );
};

export default ProductPage;
