import React, { useState } from "react";
import { Form, Input, Button, Alert, notification } from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./style.css";
import { useHistory } from "react-router-dom";
import userAPI from "../../util/userAPI";
import jwt_decode from "jwt-decode";
import { notifiError } from "../../constants/NotificationConstants";
import "./style.css";

export default function LoginPage() {
  const [email, setuserName] = useState("");
  const [password, setPassWord] = useState("");

  const hiStory = useHistory();

  const path = localStorage.getItem("path");

  const ispath = () => {
    if (path === null) {
      return "/devices-list-user";
    } else {
      return path;
    }
  };

  // const onFinishFailed = (err) => {
  //   alert("Failed", err);
  // };

  const onFinish = () => {
    const payload = {
      email: email,
      password: password,
    };

    const onSuccess = ({ data }) => {
      localStorage.setItem("defaultkey", "deviceslistuser");
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      // const decoded = jwt_decode(data.access_token);
      // console.log("data:", data);
      // console.log("decoded:", decoded);
      // console.log("decoded-userid:", decoded.user_id);
      // console.log("decoded-role:", decoded.role);
      // console.log("======login=====:", data.access_token);

      hiStory.push(ispath());
    };

    const onFailure = (err) => {
      //=======Nofi
      notifiError("Email or Password is incorrect!");
      // alert("Email or Password is incorrect!");
    };

    userAPI.login(payload).then(onSuccess).catch(onFailure);

    console.log(payload);
  };

  return (
    <div className="bigcontainer">
      <div class="container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item className="login-form-title">
            <h1 type="primary">Login</h1>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
