import { useState } from "react";
import { useNavigate } from "react-router";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FiHeart } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import product from "../../assets/productBig.png";
import product2 from "../../assets/Rectangle2.png";
import product3 from "../../assets/Rectangle3.png";
import banner from "../../assets/banner.png";

import "./index.css";

export default function NewHome() {
  const [swiperInst, setSwiperInst] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImgId, setHoveredImgId] = useState(null);

  return (
    <div>
      <div className="px-[120px] mt-4">
        <Swiper loop onSwiper={(swiper) => setSwiperInst(swiper)}>
          <SwiperSlide>
            <div className="w-[100%] h-[580px]">
              <img
                src={product}
                className="w-[100%] h-[100%] object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[100%] h-[580px]">
              <img
                src={product}
                className="w-[100%] h-[100%] object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[100%] h-[580px]">
              <img
                src={product}
                className="w-[100%] h-[100%] object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[100%] h-[580px]">
              <img
                src={product}
                className="w-[100%] h-[100%] object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="flex items-center justify-between mt-[-60px] z-50 relative px-4">
          <div
            onClick={() => swiperInst.slidePrev()}
            className="bg-[#e4dee4] rounded-round h-[44px] w-[44px] text-md flex items-center justify-center cursor-pointer"
          >
            <GoArrowLeft />
          </div>
          <div
            onClick={() => swiperInst.slideNext()}
            className="bg-[#e4dee4] rounded-round h-[44px] w-[44px] text-md flex items-center justify-center cursor-pointer"
          >
            <GoArrowRight />
          </div>
        </div>
      </div>

      <div className="px-[120px] flex flex-col items-center mt-[30px]">
        <div className="text-lg text-[#606060] font-cat">Category name</div>
        <div className="flex justify-between items-center w-[100%]">
          {[1, 2, 3, 4].map((n) => {
            return (
              <div key={n} className="flex flex-col items-center">
                <div
                  className="w-[280px] h-[280px] relative"
                  onMouseEnter={() => {
                    setHoveredImgId(n);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredImgId(null);
                    setIsHovered(false);
                  }}
                >
                  <img
                    src={product2}
                    alt=""
                    className={`image ${
                      isHovered && hoveredImgId === n ? "fade-out" : "fade-in"
                    }`}
                  />
                  <img
                    src={product3}
                    alt=""
                    className={`image ${
                      isHovered && hoveredImgId === n ? "fade-in" : "fade-out"
                    }`}
                  />
                  <div className="absolute top-2 right-2">
                    <FiHeart />
                  </div>
                </div>
                <div className="text-[#606060] text-sm font-mul ">
                  Product name
                </div>
                <div className="text-[#606060] text-sm font-mul ">
                  Product price
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[70px] px-[120px] w-[100%] flex items-center justify-between">
        <div className="w-[32%] h-[380px] overflow-hidden group/zoom">
          <img
            src={product}
            className="object-cover w-[100%] h-[100%] group-hover/zoom:scale-125 duration-300"
            alt=""
          />
        </div>
        <div className="w-[32%] h-[380px] overflow-hidden group/zoom">
          <img
            src={product2}
            className="object-cover w-[100%] h-[100%] group-hover/zoom:scale-125 duration-300"
            alt=""
          />
        </div>
        <div className="w-[32%] h-[380px] overflow-hidden group/zoom">
          <img
            src={product3}
            className="object-cover w-[100%] h-[100%] group-hover/zoom:scale-125 duration-300"
            alt=""
          />
        </div>
      </div>

      <div className="w-[100%] h-[700px] mt-4">
        <img src={banner} alt="" className="h-[100%] w-[100%] object-cover" />
      </div>
    </div>
  );
}
