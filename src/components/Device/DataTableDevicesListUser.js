import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../styles/table.css";
import CreateModalDevices from "./CreateModal/CreateModalDevices";
import EditModalDevice from "./EditModal/EditModalDevice";
import {
  notifiError,
  notifiSuccess,
} from "../../constants/NotificationConstants";
import userAPI from "../../util/userAPI";
import { flexCommon } from "../../constants/flex";
import { categoriesBeautiful } from "../../constants/categories";
import {
  filteredOrderCategoryNormal,
  filteredOrderRunWait,
  getColumnSearchProps,
  sorterID,
} from "../../constants/SearchFilter";

DataTableDevicesListUser.propTypes = {
  datas: PropTypes.array,
};
DataTableDevicesListUser.defaultProps = {
  datas: [],
};

function DataTableDevicesListUser(props) {
  const { datas } = props;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearchDeviceName = (selectedKeys, confirm, dataIndex) => {
    confirm();
    props.updateSearchDeviceName(selectedKeys[0]);
  };
  const handleSearchDeviceEmail = (selectedKeys, confirm, dataIndex) => {
    confirm();
    props.updateSearchDeviceEmail(selectedKeys[0]);
  };
  const handleSearchDeviceDisplayName = (selectedKeys, confirm, dataIndex) => {
    confirm();
    props.updateSearchDeviceDisplayName(selectedKeys[0]);
  };

  const handleCancelSearchDeviceName = (clearFilters) => {
    clearFilters();
    props.updateSearchCancelDeviceName();
  };
  const handleCancelSearchEmail = (clearFilters) => {
    clearFilters();
    props.updateSearchCancelDeviceEmail();
  };
  const handleCancelSearchDisplayName = (clearFilters) => {
    clearFilters();
    props.updateSearchCancelDeviceDisplayName();
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
    //   width: "13%",
    // },
    {
      title: "Device's Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps(
        "device's name",
        handleSearchDeviceName,
        handleCancelSearchDeviceName,
        searchInput
      ),
    },
    {
      title: "Category",
      dataIndex: `categories_name`,
      key: "categories_name",
      width: "3%",
      ...filteredOrderCategoryNormal(),
      render: (categories_name) => categoriesBeautiful(categories_name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "statues_name",
      key: "statues_name",
      width: "5%",
      ...filteredOrderRunWait(),
      render: (statues_name) => {
        if (statues_name == "Wait") {
          return <Tag color="blue">Wait</Tag>;
        } else if (statues_name == "Run") {
          return <Tag color="volcano">Run</Tag>;
        }
      },
    },
    {
      title: "Using by",
      width: "20%",
      children: [
        {
          title: "Email",
          dataIndex: ["user_id", "email"],
          key: "email",
          width: "15%",
          ...getColumnSearchProps(
            "username",
            handleSearchDeviceEmail,
            handleCancelSearchEmail,
            searchInput
          ),
        },
        {
          title: "DisplayName",
          dataIndex: ["user_id", "displayName"],
          key: "displayName",
          width: "15%",
          ...getColumnSearchProps(
            "DisplayName",
            handleSearchDeviceDisplayName,
            handleCancelSearchDisplayName,
            searchInput
          ),
        },
      ],
    },
    {
      title: "Operation",
      width: "15%",
      render: (record) => (
        <>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EditModalDevice record={record} updateEdit={props.updateEdit} />

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deviceDelete(record);
              }}
            >
              <Button
                type="default"
                danger
                icon={<CloseCircleOutlined />}
                style={flexCommon}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const deviceDelete = (record) => {
    // console.log("record ben con:", record);
    const onSuccess = ({ data }) => {
      notifiSuccess("Delete successfully!");
      props.updateDeleteDevice(record);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Delete failed!");
    };
    userAPI.deleteDevice(record.id).then(onSuccess).catch(onFailure);
  };

  return (
    <div className="tablea" style={{ padding: "0px 5%" }}>
      <CreateModalDevices updateCreate={props.updateCreate} />
      <Table
        columns={columns}
        dataSource={datas}
        size="default"
        // width={1400}
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

export default DataTableDevicesListUser;
