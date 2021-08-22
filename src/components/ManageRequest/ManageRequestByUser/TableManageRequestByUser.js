import { Button, Popconfirm, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import userAPI from "../../../util/userAPI";
import { ReloadOutlined } from "@ant-design/icons";
import { flexCommon } from "../../../constants/flex";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";
import { categoriesBeautiful } from "../../../constants/categories";
import {
  filteredOrderCategoryDevicesNameOfDevicesID,
  getColumnSearchProps,
  sorterID,
} from "../../../constants/SearchFilter";
import "../../../styles/table.css";

function TableManageRequestByUser(props) {
  const [datas, setdatas] = useState("");
  const [status, setStatus] = useState("Wait");
  const [userID, setUserId] = useState("");
  //======================================SEARCH===============================================
  const handleSearchDeviceName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      status: status,
      user_id: userID,
      devicename: v,
    };
    const onSuccess = ({ data }) => {
      setdatas(data);
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
      user_id: userID,
      devicename: "",
    };
    const onSuccess = ({ data }) => {
      setdatas(data);
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
      width: "5%",
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
      width: "5%",
      ...filteredOrderCategoryDevicesNameOfDevicesID(),
      render: (categories_name) => categoriesBeautiful(categories_name),
    },
    {
      title: "Description",
      dataIndex: ["devices_id", "description"],
      key: "description",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "statues_name",
      key: "statues_name",
      width: "5%",
      render: (statues_name) => {
        if (statues_name == "Wait") {
          return <Tag color="blue">Wait</Tag>;
        }
      },
    },
    {
      title: "Operation",
      width: "5%",
      render: (record) => (
        <>
          <Popconfirm
            title="Are you sure to cancel request?"
            onConfirm={() => {
              handleCancelReq(record);
            }}
          >
            <Button danger icon={<DeleteFilled />} style={flexCommon}>
              Cancel
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleCancelReq = (record) => {
    // console.log(record.id);
    const onSuccess = ({ data }) => {
      //   console.log(data);
      notifiSuccess("Cancel request successful!");
      const dataSoucre = [...datas];
      const index = dataSoucre.findIndex((e) => e == record);
      dataSoucre.splice(index, 1);
      setdatas(dataSoucre);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Cancel request failed!");
    };
    userAPI.rejectRequestByUser(record.id).then(onSuccess).catch(onFailure);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      //   console.log(data);
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.userManageRequest().then(onSuccess).catch(onFailure);

    const onSuccess1 = ({ data }) => {
      setUserId(data.id);
    };
    const onFailure1 = (err) => {
      console.log(err);
    };
    userAPI.getuser().then(onSuccess1).catch(onFailure1);
  }, []);

  const handleRefesh = () => {
    const onSuccess = ({ data }) => {
      //   console.log(data);
      setdatas(data);
      notifiSuccess("Refesh successful!");
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Refesh failed!");
    };
    userAPI.userManageRequest().then(onSuccess).catch(onFailure);
  };

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "14%" }}
        type="primary"
        onClick={handleRefesh}
        icon={<ReloadOutlined style={flexCommon} />}
      >
        Refesh
      </Button>
      <div className="table">
        <Table
          // className="table-take"
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
            defaultPageSize: ["5"],
          }}
        />
      </div>
    </>
  );
}

export default TableManageRequestByUser;
