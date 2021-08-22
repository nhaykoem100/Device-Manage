import { Button, Modal, Layout, Table } from "antd";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { ApiFilled } from "@ant-design/icons";
import {
  notifiErrorTopLeft,
  notifiSuccessTopLeft,
} from "../../../constants/NotificationConstants";
import userAPI from "../../../util/userAPI";
import "./style.css";
import { flexCommon } from "../../../constants/flex";
import { categoriesBeautiful } from "../../../constants/categories";
import {
  filteredOrderCategoryDevicesNameOfDevicesID,
  getColumnSearchProps,
  sorterID,
} from "../../../constants/SearchFilter";

function TakeDeviceByAdmin(props) {
  const [datas, setdatas] = useState("");

  const [searchDeviceName, setsearchDeviceName] = useState("");
  const [searchEmail, setsearchEmail] = useState("");
  const [searchDisplayName, setsearchDisplayName] = useState("");
  const [status, setStatus] = useState("Accept");

  //======================================SEARCH===============================================
  const handleSearchDeviceName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      status: status,
      devicename: v,
      email: searchEmail,
      displayname: searchDisplayName,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdatas(data);
      setsearchDeviceName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };
  const handleSearchEmail = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      status: status,
      devicename: searchDeviceName,
      email: v,
      displayname: searchDisplayName,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdatas(data);
      setsearchEmail(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };
  const handleSearchDisplayName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      status: status,
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: v,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdatas(data);
      setsearchDisplayName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };
  //==================Cancel Search====================
  const handleCancelSearchDeviceName = (clearFilters) => {
    clearFilters();
    const params = {
      status: status,
      devicename: "",
      email: searchEmail,
      displayname: searchDisplayName,
    };
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDeviceName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };
  const handleCancelSearchEmail = (clearFilters) => {
    clearFilters();
    const params = {
      status: status,
      devicename: searchDeviceName,
      email: "",
      displayname: searchDisplayName,
    };
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchEmail("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };
  const handleCancelSearchDisplayName = (clearFilters) => {
    clearFilters();
    const params = {
      status: status,
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: "",
    };
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDisplayName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequest(params).then(onSuccess).catch(onFailure);
  };

  const searchInput = useRef(null);
  const columns = [
    {
      title: "ID req",
      dataIndex: "id",
      key: "id",
      width: "7%",
      ...sorterID(),
    },
    // {
    //   title: "UserName",
    //   dataIndex: "user_name",
    //   key: "user_name",
    //   width: "20%",
    // },
    {
      title: "Device's Name",
      dataIndex: ["devices_id", "name"],
      key: "devices_name",
      width: "15%",
      ...getColumnSearchProps(
        "device name",
        handleSearchDeviceName,
        handleCancelSearchDeviceName,
        searchInput
      ),
    },
    {
      title: "Category",
      dataIndex: ["devices_id", "categories_name"],
      key: "categories_name",
      width: "7%",
      ...filteredOrderCategoryDevicesNameOfDevicesID(),
      render: (categories_name) => categoriesBeautiful(categories_name),
    },
    {
      title: "Description",
      dataIndex: ["devices_id", "description"],
      key: "description",
      width: "18%",
    },
    {
      title: "Using by",
      children: [
        {
          title: "Email",
          dataIndex: ["user_id", "email"],
          key: "email",
          width: "18%",
          ...getColumnSearchProps(
            "email",
            handleSearchEmail,
            handleCancelSearchEmail,
            searchInput
          ),
        },
        {
          title: "DisplayName",
          dataIndex: ["user_id", "displayName"],
          key: "displayName",
          width: "12%",
          ...getColumnSearchProps(
            "displayname",
            handleSearchDisplayName,
            handleCancelSearchDisplayName,
            searchInput
          ),
        },
      ],
    },
    {
      title: "Operation",
      width: "10%",
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            // style={{
            //   color: " #40a9ff",
            //   borderColor: "#40a9ff",
            // }}
            type="primary"
            style={flexCommon}
            ghost
            icon={<ApiFilled />}
            onClick={() => {
              handleTake(record);
            }}
          >
            Take
          </Button>
        </div>
      ),
    },
  ];
  const [isModalVisible, setisModalVisible] = useState(false);

  const handleTake = (record) => {
    console.log(record);
    const onSuccess = ({ data }) => {
      //   console.log(data);
      notifiSuccessTopLeft("Take successful!");
      const dataSourse = [...datas];
      const index = dataSourse.findIndex((e) => e == record);
      dataSourse.splice(index, 1);
      setdatas(dataSourse);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiErrorTopLeft("Take failed!");
    };
    userAPI.takeDeviceByAdmin(record.id).then(onSuccess).catch(onFailure);
  };

  const handleClick = () => {
    setisModalVisible(true);
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      //   console.log(data);
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.listAccept().then(onSuccess).catch(onFailure);
  }, [isModalVisible]);

  return (
    <>
      <Fragment>
        <Button
          style={{ marginLeft: "0.1%" }}
          type="primary"
          icon={
            <ApiFilled style={flexCommon} style={{ display: "inline-flex" }} />
          }
          onClick={handleClick}
        >
          Take Device
        </Button>
      </Fragment>
      <Modal
        title="Take Device By Admin"
        visible={isModalVisible}
        // onCancel={handleCancel}
        // maskClosable={true}
        closable={false}
        style={{ top: 60 }}
        width={1400}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Back
          </Button>,
        ]}
      >
        <Table
          className="table-take"
          columns={columns}
          dataSource={datas}
          size="default"
          bordered
          pagination={{
            position: ["bottomCenter"],
            // showSizeChanger: true,
            pageSizeOptions: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "15",
              "20",
            ],
            defaultPageSize: ["4"],
          }}
        />
      </Modal>
    </>
  );
}

export default TakeDeviceByAdmin;
