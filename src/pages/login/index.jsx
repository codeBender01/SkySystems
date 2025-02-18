import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Cookies from "universal-cookie";

import { Input, Form, Button } from "antd";

import login from "../../assets/login.jpeg";

import { useUserLoginMutation } from "../../store/services/auth";

import "../../antd.css";

const cookies = new Cookies();

const LoginForm = () => {
  const [userLogin] = useUserLoginMutation();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await userLogin(loginData);
    if (res.data) {
      localStorage.setItem("userAccessToken", res.data.accessToken);
      localStorage.setItem("userRefreshToken", res.data.refreshToken);

      localStorage.setItem("client", JSON.stringify(res.data.client));
      navigate("/");
    }
  };

  return (
    <div
      className="flex-col flex items-center justify-between pl-0 md:flex-row md:pl-12 md:items-start"
      id="login"
    >
      <div className="pt-28 mb-4 flex flex-col md:w-[40%] md:mb-0 w-[90%]">
        <div className="text-[20px] font-mul self-start">
          Welcome to
          <span className="text-orangeLogo font-mul"> SkySystems</span>
        </div>
        <Form
          className="flex flex-wrap flex-col items-center gap-2 mt-4 w-[80%]"
          layout="vertical"
          wrapperCol={{
            span: 32,
          }}
          labelWrap={false}
          onFinish={handleLogin}
        >
          <Form.Item name="phone" className="w-[100%]">
            <Input
              className="border-b1 border-blackMain py-3"
              placeholder="Phone number"
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  phone: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="password" className="w-[100%]">
            <Input.Password
              className="border-b1 border-blackMain py-3"
              placeholder="Password"
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item className="w-[100%]">
            <Button
              htmlType="submit"
              className="bg-blackMain text-white text-md uppercase w-[100%] py-6"
            >
              Next
            </Button>
          </Form.Item>
        </Form>

        <div>
          No account?{" "}
          <span
            onClick={() => navigate("/client-auth/signup")}
            className="text-orangeLogo font-mul underline hover:opacity-80 duration-100 cursor-pointer"
          >
            Sign up
          </span>
        </div>
        <div
          onClick={() => navigate("/")}
          className="text-textGray underline cursor-pointer hover:opacity-85 duration-100"
        >
          Back to Home
        </div>
      </div>

      <div className="w-[100%] h-[70vh] md:w-[55%] md:h-[100vh]">
        <img
          src={login}
          alt="login"
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
};

export default LoginForm;
