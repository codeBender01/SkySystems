import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
  useUserRegisterMutation,
  useVerifyUserMutation,
} from "../../store/services/auth";

import Cookies from "universal-cookie";

import { registerUser, verifyUser } from "../../store/userAuth";

import { Form, Input, Button } from "antd";

import login from "../../assets/login.jpeg";

const cookies = new Cookies();

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useUserRegisterMutation();
  const [verify] = useVerifyUserMutation();

  const [isVerify, setIsVerify] = useState();
  const [clientId, setClientId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    phone: "",
    email: "",
    password: "",
    country: "",
    city: "",
    street: "",
    apartmentNumber: "",
  });

  const handleRegistration = async () => {
    for (let r in registerData) {
      if (registerData[r] === "") {
        return;
      }
      setIsVerify(true);
      const res = await register(registerData);
      console.log(res);
    }
  };

  const handleVerification = async () => {
    // dispatch(
    //   verifyUser({
    //     id: clientId,
    //     code: verificationCode,
    //   }).then((res) => {
    //     cookies.set("userAccessToken", res.payload.accessToken);
    //     cookies.set("userRefreshToken", res.payload.refreshToken);
    //     localStorage.setItem("clientInfo", JSON.stringify(res.payload.client));
    //     navigate("/");
    //   })
    // );

    const res = await verifyUser({
      id: clientId,
      code: verificationCode,
    });

    console.log(res);
  };

  return (
    <div
      className="flex-col flex items-center justify-between pl-0 md:flex-row md:pl-12 md:items-start"
      id="login"
    >
      <div className="pt-16 mb-4 flex flex-col md:w-[40%] md:mb-0 w-[90%]">
        <div className="text-[20px] font-mul self-start">
          Be part of
          <span className="text-orangeLogo font-mul"> SkySystems</span>
        </div>
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[80%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={isVerify ? handleVerification : handleRegistration}
        >
          <Form.Item name="fullname" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Fullname"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  firstName: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="phone" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Phone number"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  phone: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            className="w-[100%]"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Email"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="country" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Country"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  country: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="city" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="City"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  city: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="street" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Street"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  street: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="apartment" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Apartment number"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  apartmentNumber: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="password" className="w-[100%]">
            <Input.Password
              className="border-b1 border-blackMain py-3"
              placeholder="Password"
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="code"
            className={`w-[100%] ${
              isVerify ? "h-auto mb-6" : "h-0 mb-0 overflow-hidden"
            } duration-200`}
          >
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Verification code"
              onChange={(e) => {
                setVerificationCode(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item className="w-[100%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md uppercase w-[100%] py-6"
            >
              sign up
            </Button>
          </Form.Item>
        </Form>

        <div>
          Have an account?{" "}
          <span
            onClick={() => navigate("/client-auth/login")}
            className="text-orangeLogo font-mul underline hover:opacity-80 duration-100 cursor-pointer"
          >
            Login
          </span>
        </div>
        <div
          onClick={() => navigate("/")}
          className="text-textGray underline cursor-pointer hover:opacity-85 duration-100"
        >
          Back to Home
        </div>
      </div>

      <div className="w-[100%] h-[70vh] md:w-[55%] md:min-h-[105vh]">
        <img
          src={login}
          alt="login"
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
};

export default UserForm;
