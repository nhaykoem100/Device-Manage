import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState, useRef } from "react";
import userAPI from "../../../util/userAPI";
import { ReloadOutlined, BulbOutlined } from "@ant-design/icons";
import { flexCommon } from "../../../constants/flex";
import "./styles.css";
import { categoriesBeautiful } from "../../../constants/categories";
import {
  filteredOrderCategoryNormal,
  filteredOrderRunWait,
  getColumnSearchProps,
  sorterID,
} from "../../../constants/SearchFilter";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";

function TableDeviceListForUserRole(props) {
  const [devicesList, setdevicesList] = useState([]);
  const [userLogin, setuserLogin] = useState("");
  let btnRef = useRef();

  //======================================SEARCH===============================================
  const handleSearchDeviceName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      name: v,
    };
    const onSuccess = ({ data }) => {
      setdevicesList(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  //==================Cancel Search====================
  const handleCancelSearchDeviceName = (clearFilters) => {
    clearFilters();
    const params = {
      name: "",
    };
    const onSuccess = ({ data }) => {
      setdevicesList(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };

  const searchInput = useRef(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...sorterID(),
    },
    // {
    //   title: "Image",
    //   dataIndex: "feature_img",
    //   key: "feature_img",
    //   width: "15%",
    // },
    {
      title: "Device's Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps(
        "device name",
        handleSearchDeviceName,
        handleCancelSearchDeviceName,
        searchInput
      ),
    },
    {
      title: "Category",
      dataIndex: "categories_name",
      key: "categories_name",
      width: "10%",
      ...filteredOrderCategoryNormal(),
      render: (categories_name) => categoriesBeautiful(categories_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "35%",
    },
    {
      title: "Status",
      dataIndex: "statues_name",
      key: "statues_name",
      width: "7%",
      ...filteredOrderRunWait(),
      render: (statues_name) => {
        if (statues_name == "Wait") {
          return <Tag color="blue">Wait</Tag>;
        } else if (statues_name == "Run") {
          return <Tag color="volcano">Run</Tag>;
        }
      },
    },
    // {
    //   title: "Time Require",
    //   dataIndex: "",
    //   key: "",
    //   width: "13%",
    // },
    {
      title: "Operation",
      width: "20%",
      render: (record) => (
        <>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Wait: request, Run: Using disabled, Đang xin: Pending disabled*/}
            {(() => {
              if (record.statues == 1) {
                return (
                  <Button
                    className="Btn-Using"
                    ref={btnRef}
                    type="primary"
                    ghost
                    icon={<BulbOutlined style={flexCommon} />}
                    disabled
                  >
                    Using
                  </Button>
                );
              } else if (record.statues == 2) {
                return (
                  <Popconfirm
                    title="Sure to Request?"
                    onConfirm={() => {
                      onRequest(record);
                    }}
                  >
                    <Button
                      ref={btnRef}
                      type="primary"
                      ghost
                      icon={<BulbOutlined style={flexCommon} />}
                    >
                      Request
                    </Button>
                  </Popconfirm>
                );
              }
              // else if (record.statues == 3) {
              //   return (
              //     <Button
              //       type="primary"
              //       onClick={() => {
              //         onRequest(record);
              //       }}
              //       disabled
              //     >
              //       Pending
              //     </Button>
              //   );
              // }
            })()}

            {/* <Button type="primary">Return</Button> */}
          </Space>
        </>
      ),
    },
  ];

  const onRequest = (record) => {
    // console.log("aaa", record.id);
    // console.log("bbb", userLogin);
    // btnRef.current.setAttribute("disabled", "disabled");

    // console.log("record", record);
    // btnRef.current.setAttribute("disabled", "disabled");
    const clone = {
      devices_id: record.id,
      user_id: userLogin.id,
    };

    const onSuccess = ({ data }) => {
      btnRef.current.setAttribute("disabled", "disabled");
      notifiSuccess("Request successful!");
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Request failed!");
    };
    userAPI.requestDevice(clone).then(onSuccess).catch(onFailure);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      // alert(" tra ve data!");
      //   console.log(data);
      setdevicesList(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.getDevicesInfo().then(onSuccess).catch(onFailure);

    const onSuccess1 = ({ data }) => {
      // console.log(data, data.id);
      setuserLogin(data);
    };
    const onFailure1 = (err) => {
      console.log(err);
    };
    userAPI.getuser().then(onSuccess1).catch(onFailure1);
  }, []);

  const handleRefesh = () => {
    const onSuccess = ({ data }) => {
      // alert(" tra ve data!");
      console.log(data);
      setdevicesList(data);
      notifiSuccess("Refesh successful!");
      // btnRef.current.setAttribute("enabled", "enabled");
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Refesh failed!");
    };
    userAPI.getDevicesInfo().then(onSuccess).catch(onFailure);
  };
  return (
    <>
      <Button
        style={{ float: "right", marginRight: "14%" }}
        // icon={<SyncOutlined />}
        type="primary"
        onClick={handleRefesh}
        icon={<ReloadOutlined style={flexCommon} />}
      >
        Refesh
      </Button>
      <div className="table">
        <Table
          columns={columns}
          dataSource={devicesList}
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

export default TableDeviceListForUserRole;
