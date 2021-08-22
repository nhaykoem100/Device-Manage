import { Button, Space, Table } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { flexCommon } from "../../constants/flex";
import { ReloadOutlined } from "@ant-design/icons";
import {
  notifiError,
  notifiErrorTopLeft,
  notifiSuccess,
  notifiSuccessTopLeft,
} from "../../constants/NotificationConstants";
import userAPI from "../../util/userAPI";
import TakeDeviceByAdmin from "./TakeDevice/TakeDeviceByAdmin";
import { categoriesBeautiful } from "../../constants/categories";
import {
  filteredOrderCategoryDevicesNameOfDevicesID,
  getColumnSearchProps,
  sorterID,
} from "../../constants/SearchFilter";

function TableAdminManageRequest(props) {
  const [requestList, setRequestList] = useState([]);

  const [searchDeviceName, setsearchDeviceName] = useState("");
  const [searchEmail, setsearchEmail] = useState("");
  const [searchDisplayName, setsearchDisplayName] = useState("");
  const [status, setStatus] = useState("Wait");

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
      setRequestList(data);
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
      setRequestList(data);
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
      setRequestList(data);
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
      setRequestList(data);
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
      setRequestList(data);
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
      setRequestList(data);
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
      //   render: (object) => renderCustomCell(object),
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
      title: "Requested by",
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
      width: "20%",
      render: (record) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            icon={<CheckCircleOutlined />}
            style={flexCommon}
            ghost
            type="primary"
            onClick={() => {
              handleAccept(record);
            }}
          >
            Accept
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            style={flexCommon}
            ghost
            danger
            onClick={() => {
              handleReject(record);
            }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleAccept = (record) => {
    // console.log("aaa", record.id);
    const onSuccess = ({ data }) => {
      // console.log(data);
      notifiSuccessTopLeft("Accept Successful!");
      const dataSourse = [...requestList];
      const index = dataSourse.findIndex((e) => e == record);
      dataSourse.splice(index, 1);
      setRequestList(dataSourse);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiErrorTopLeft("Accept Failed!");
    };
    userAPI.acceptAction(record.id).then(onSuccess).catch(onFailure);
  };

  const handleReject = (record) => {
    // console.log("aaa", record.id);
    const onSuccess = ({ data }) => {
      notifiSuccessTopLeft("Reject Successful!");
      const dataSourse = [...requestList];
      const index = dataSourse.findIndex((e) => e == record);
      dataSourse.splice(index, 1);
      setRequestList(dataSourse);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiSuccessTopLeft("Reject Failed!");
    };
    userAPI.rejectAction(record.id).then(onSuccess).catch(onFailure);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      console.log(data);
      setRequestList(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.listRequest().then(onSuccess).catch(onFailure);

    // const onSuccess1 = ({ data }) => {
    //     //   console.log(data);
    //     setRequestList(data);
    //   };
    //   const onFailure1 = (err) => {
    //     console.log(err);
    //   };
    //   userAPI.getDevicesInfo().then(onSuccess1).catch(onFailure1);
  }, []);

  const handleRefesh = () => {
    const onSuccess = ({ data }) => {
      // console.log("data moi", data);
      setRequestList(data);
      notifiSuccess("Refesh Successful!");
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Refesh Failed!");
    };
    userAPI.listRequest().then(onSuccess).catch(onFailure);
  };

  return (
    <div className="tablea" style={{ padding: "0 5%" }}>
      <Fragment>
        <TakeDeviceByAdmin />
        <Button
          icon={<ReloadOutlined style={flexCommon} />}
          style={{ float: "right", marginRight: "0.1%", marginBottom: "13px" }}
          // icon={<SyncOutlined />}
          type="primary"
          onClick={handleRefesh}
        >
          Refesh
        </Button>
      </Fragment>
      <Table
        columns={columns}
        dataSource={requestList}
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
    </div>
  );
}

export default TableAdminManageRequest;
