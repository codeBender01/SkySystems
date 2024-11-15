import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { Form, Button, Input, message } from "antd";

import { useAdminLoginMutation } from "../../store/services/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function AdminLogin() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [loginAdmin, { isError, isSuccess, data, isLoading }] =
    useAdminLoginMutation();

  useEffect(() => {
    if (isError) {
      message.error("Error: Wrong username or password");
    } else if (isSuccess) {
      message.success("Success!");
      cookies.set("adminAccessToken", data.accessToken);
      cookies.set("adminRefreshToken", data.refreshToken);
      navigate("/admin");
    }
  }, [isSuccess, isError]);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100%]">
      {contextHolder}
      <div className="font-man text-[32px] text-blackMain mb-4">
        Admin login
      </div>
      <Form
        className="flex flex-wrap flex-col items-center gap-2 p-6 rounded-md w-[45%]"
        layout="vertical"
        wrapperCol={{
          span: 32,
        }}
        labelWrap={false}
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        onFinish={async () => {
          const res = await loginAdmin(loginData).unwrap();
        }}
      >
        <Form.Item
          name="username"
          className="w-[100%]"
          label={
            <label className="font-main text-sm text-blackMain p-0">
              Username
            </label>
          }
          required
        >
          <Input
            onChange={(e) => {
              setLoginData({
                ...loginData,
                username: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="w-[100%]"
          label={
            <label className="font-main text-sm text-blackMain p-0">
              Password
            </label>
          }
          required
        >
          <Input.Password
            onChange={(e) => {
              setLoginData({
                ...loginData,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item className="w-[60%]">
          <Button
            loading={isLoading}
            htmlType="submit"
            className="bg-blackMain text-white text-md w-[100%] py-4"
          >
            Enter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
