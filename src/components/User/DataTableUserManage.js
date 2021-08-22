import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Image, Input, Popconfirm, Space, Table, Tag } from "antd";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import userAPI from "../../util/userAPI";
import EditModal from "./EditUser/EditModal";
import CreateModal from "./CreateUser/CreateModal";
import {
  notifiError,
  notifiSuccess,
} from "../../constants/NotificationConstants";
import { flexCommon } from "../../constants/flex";
import SearchFilter, {
  filteredOrdeRoleNormal,
  getColumnSearchProps,
  getRoleColumnSearchProps,
  sorterID,
} from "../../constants/SearchFilter";
import moment from "moment";

DataTableUserManage.propTypes = {
  datas: PropTypes.array,
};
DataTableUserManage.defaultProps = {
  datas: [],
};

function DataTableUserManage(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearchEmail = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
    props.updateSearchEmail(selectedKeys[0]);
    // props.updateSearch(selectedKeys[0]);
  };
  const handleSearchDisplayName = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
    props.updateSearchDisplayName(selectedKeys[0]);
    // props.updateSearch(selectedKeys[0]);
  };
  // const handleSearchRole = (selectedKeys, confirm) => {
  //   console.log(selectedKeys);
  //   // props.updateSearchRole(selectedKeys);
  // };
  const handleCancelSearchEmail = (clearFilters) => {
    clearFilters();
    // setSearchText("");
    props.updateSearchCancelEmail();
  };
  const handleCancelSearchDisplayName = (clearFilters) => {
    clearFilters();
    // setSearchText("");
    props.updateSearchCancelDisplayName();
  };
  // const handleCancelSearchRole = (clearFilters) => {
  //   // clearFilters();
  //   // setSearchText("");
  //   // props.updateSearchCancelEmail();
  // };

  const searchInput = useRef(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "7%",
      ...sorterID(),
    },
    // {
    //   title: "Avatar",
    //   dataIndex: "image",
    //   key: "image",
    //   width: "5%",
    //   render: () => (
    //     <>
    //       {/* <Button>See Avatar</Button> */}
    //       <Image
    //         width={25}
    //         height={25}
    //         style={{ zIndex: "-1" }}
    //         src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //       />
    //     </>
    //   ),
    // },
    {
      title: "UserName",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps(
        "username",
        handleSearchEmail,
        handleCancelSearchEmail,
        searchInput
      ),
    },
    {
      title: "Role",
      dataIndex: "role_name",
      // key: "role",
      width: "7%",
      // ...getRoleColumnSearchProps(handleSearchRole, handleCancelSearchRole),
      ...filteredOrdeRoleNormal(),
      render: (role_name, text) => (
        <>
          {(() => {
            if (role_name == "admin") {
              return (
                <Tag color={"volcano"} key={"admin"}>
                  Admin
                </Tag>
              );
            } else if (role_name == "user") {
              return (
                <Tag color={"geekblue"} key={"user"}>
                  User
                </Tag>
              );
            }
          })()}
        </>
      ),
    },
    {
      title: "DisplayName",
      dataIndex: "displayName",
      key: "displayName",
      width: "30%",
      ...getColumnSearchProps(
        "username",
        handleSearchDisplayName,
        handleCancelSearchDisplayName,
        searchInput
      ),
    },
    {
      title: "Created Date",
      key: "createdDate",
      width: "20%",
      render: (record) => {
        if (record.role_name === "admin") {
          return (
            <Tag color="volcano">
              {moment(record.createdDate).format("HH:mm a, DD/MM/YYYY")}
            </Tag>
          );
        } else if (record.role_name === "user") {
          return (
            <Tag color="geekblue">
              {moment(record.createdDate).format("HH:mm a, DD/MM/YYYY")}
            </Tag>
          );
        }
      },
    },
    {
      title: "Operation",
      render: (record) => (
        <Fragment style={flexCommon}>
          <Space>
            <EditModal Record={record} updateEdit={props.updateEdit} />

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                userDelete(record);
              }}
            >
              <Button
                danger
                icon={<CloseCircleOutlined />}
                type="default"
                style={flexCommon}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </Fragment>
      ),
    },
  ];

  const userDelete = (record) => {
    // console.log("delete la:", record, record.id);
    const onSuccess = ({ data }) => {
      notifiSuccess("Delete successfully!");
      props.updateDelete(record);
    };

    const onFailure = (err) => {
      console.log(err);
      notifiError("Delete Failed!");
    };

    userAPI.deleteUser(record.id).then(onSuccess).catch(onFailure);
  };

  // const [datas, setdatas] = useState("");
  const { datas } = props;
  // console.log("datas:", props.datas);

  return (
    <>
      <CreateModal updateCreate={props.updateCreate} />

      <div className="table">
        <Table
          columns={columns}
          dataSource={datas}
          bordered
          rowKey={"id"}
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

export default DataTableUserManage;
