import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import RouterURL from "../routes/RouterURL";
import auth from "../components/Login/auth";
import jwt_decode from "jwt-decode";
import MainNav from "./MainNav";
import ProfileUser from "../components/Profile/ProfileUser";
import userAPI from "../util/userAPI";
import { notifiError } from "../constants/NotificationConstants";

function MainLayout(props) {
  const { Header, Content } = Layout;
  const history = useHistory();

  const refresh = localStorage.getItem("refresh_token");

  const onLogout = () => {
    localStorage.clear();
    history.push("/login");
    // const clone = { refresh: refresh };
    // const onSuccess = ({ data }) => {
    //   localStorage.clear();
    //   history.push("/login");
    //   // console.log("log out thanh cong");
    // };

    // const onFailure = (err) => {
    //   notifiError("Fail to Logout!");
    // };

    // userAPI.logout(clone).then(onSuccess).catch(onFailure);
  };

  const acctoken = localStorage.getItem("token");
  const decode = jwt_decode(acctoken);
  // console.log("===mainlayout===  ", decode.role);
  // console.log("===mainlayout===  ", props.children);

  return (
    <>
      <Layout>
        <Header className="Header-Nav">
          <MainNav role={decode.role} />

          <Menu
            theme="dark"
            mode="horizontal"
            className="Menu-logout"
            selectable="false"
          >
            <ProfileUser />
            <Menu.Item key="login" onClick={onLogout}>
              Log out
            </Menu.Item>
          </Menu>
        </Header>

        <div>{props.children}</div>
      </Layout>
    </>
  );
}

export default MainLayout;
