import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function MainNav(props) {
  const isRole = props.role;
  // console.log("mainnav: role=", isRole);
  const defaultkey = localStorage.getItem("defaultkey");

  const renderNav = () => {
    if (isRole === 2) {
      return (
        <Menu
          theme="dark"
          mode="horizontal"
          className="Menu-header"
          defaultSelectedKeys="deviceslistuser"
          selectedKeys={defaultkey}
        >
          <Menu.Item
            key="deviceslistuser"
            onClick={() =>
              localStorage.setItem("defaultkey", "deviceslistuser")
            }
          >
            <Link to="/devices-list-user">Devices List</Link>
          </Menu.Item>
          <Menu.Item
            key="managerequestbyuser"
            onClick={() =>
              localStorage.setItem("defaultkey", "managerequestbyuser")
            }
          >
            <Link to="/manage-request-user">Manage Requests</Link>
          </Menu.Item>
          <Menu.Item
            key="historylistuser"
            onClick={() =>
              localStorage.setItem("defaultkey", "historylistuser")
            }
          >
            <Link to="/history-list-user">History List</Link>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu
          theme="dark"
          mode="horizontal"
          className="Menu-header"
          defaultSelectedKeys="deviceslistuser"
          selectedKeys={defaultkey}
        >
          <Menu.Item
            key="deviceslistuser"
            onClick={() =>
              localStorage.setItem("defaultkey", "deviceslistuser")
            }
          >
            <Link to="/devices-list-user">Manage Devices</Link>
          </Menu.Item>
          <Menu.Item
            key="managerequestadmin"
            onClick={() =>
              localStorage.setItem("defaultkey", "managerequestadmin")
            }
          >
            <Link to="/manage-request-admin">Manage Requests</Link>
          </Menu.Item>
          <Menu.Item
            key="userlistadmin"
            onClick={() => localStorage.setItem("defaultkey", "userlistadmin")}
          >
            <Link to="/user-list-admin">Manage Users</Link>
          </Menu.Item>
          <Menu.Item
            key="trackingadmin"
            onClick={() => localStorage.setItem("defaultkey", "trackingadmin")}
          >
            <Link to="/tracking-admin">Tracking Devices</Link>
          </Menu.Item>
        </Menu>
      );
    }
  };

  return renderNav(props.role);
}

export default MainNav;
