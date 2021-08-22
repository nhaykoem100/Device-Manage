import { Button, Table, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { flexCommon } from "../../constants/flex";
import userAPI from "../../util/userAPI";
import { categoriesBeautiful } from "../../constants/categories";
import {
  endDateFormatMoment,
  startDateFormatMoment,
} from "../../constants/dateTimeMoment";
import {
  filteredOrderAcceptRejectReturn,
  filteredOrderCategoryDevicesNameOfDevicesID,
  getColumnSearchProps,
  getDateColumnSearchProps,
  sorterID,
} from "../../constants/SearchFilter";
import moment from "moment";
import "../../styles/table.css";
import {
  notifiError,
  notifiSuccess,
} from "../../constants/NotificationConstants";

function TableHistoryListUser(props) {
  const [datas, setdatas] = useState("");
  const [userID, setUserId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [startDatePicker, setstartDatePicker] = useState("");
  const [endDatePicker, setendDatePicker] = useState("");
  //======================================SEARCH===============================================
  // const handlNutIcon = (e) => {
  //   console.log("=====:", e);
  // };
  const handleSearchDeviceName = (v, confirm, dataIndex) => {
    setDeviceName(v);
    confirm();
    const params = {
      user_id: userID,
      devicename: v,
      startDate:
        startDatePicker == ""
          ? ""
          : moment(startDatePicker)
              .startOf("date")
              .format("YYYY-MM-DDTHH:mm:ss"),
      endDate:
        startDatePicker == ""
          ? ""
          : moment(endDatePicker).endOf("date").format("YYYY-MM-DDTHH:mm:ss"),
    };
    console.log("devname:", params);
    const onSuccess = ({ data }) => {
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleChoosingDatPicker = (v) => {
    if (v == null) {
      setstartDatePicker("");
      setendDatePicker("");
    } else {
      // const start = moment(v[0]).format("YYYY-MM-DD");
      // const end = moment(v[1]).add(1, "day").format("YYYY-MM-DD");
      setstartDatePicker(v[0]);
      setendDatePicker(v[1]);
      console.log(v[0]._d + "  ======  " + v[1]._d);
      // console.log(start + " + " + end);
      // setstartDatePicker(moment(v[0]).format("YYYY-MM-DD"));
      // setendDatePicker(moment(v[1]).add(1, "day").format("YYYY-MM-DD"));
      // console.log(
      //   moment("").format("YYYY-MM-DD"),
      //   moment(v[1]).add(1, "day").format("YYYY-MM-DD")
      // );
    }
  };
  const handleSearchDatePicker = (confirm, filtered) => {
    console.log("aaaa:", filtered);
    confirm();
    const params = {
      user_id: userID,
      devicename: deviceName,
      startDate:
        startDatePicker == ""
          ? ""
          : moment(startDatePicker)
              .startOf("date")
              .format("YYYY-MM-DDTHH:mm:ss"),
      endDate:
        startDatePicker == ""
          ? ""
          : moment(endDatePicker).endOf("date").format("YYYY-MM-DDTHH:mm:ss"),
    };
    console.log("search:", params);
    const onSuccess = ({ data }) => {
      // setstartDatePicker(moment(startDatePicker).format("YYYY-MM-DD"));
      // setendDatePicker(
      //   moment(endDatePicker).add("day", 1).format("YYYY-MM-DD")
      // );
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  //==================Cancel Search====================
  const handleCancelSearchDeviceName = (clearFilters) => {
    clearFilters();
    const params = {
      user_id: userID,
      devicename: "",
      startDate:
        startDatePicker == ""
          ? ""
          : moment(startDatePicker)
              .startOf("date")
              .format("YYYY-MM-DDTHH:mm:ss"),
      endDate:
        startDatePicker == ""
          ? ""
          : moment(endDatePicker).endOf("date").format("YYYY-MM-DDTHH:mm:ss"),
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      setDeviceName("");
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleCancelSearchDatePicker = (clearFilters) => {
    clearFilters();
    setstartDatePicker("");
    setendDatePicker("");
    const params = {
      user_id: userID,
      devicename: deviceName,
      startDate: "",
      endDate: "",
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
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
        // handlNutIcon
      ),
      //   render: (object) => renderCustomCell(object),
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
      title: "Time used",
      ...getDateColumnSearchProps(
        handleChoosingDatPicker,
        handleSearchDatePicker,
        handleCancelSearchDatePicker,
        startDatePicker,
        endDatePicker
      ),
      children: [
        {
          title: "Time Start (Time Request)",
          // dataIndex: "",
          key: "startDate",
          width: "18%",
          render: (record) => startDateFormatMoment(record),
        },
        {
          title: "Time End (Time Reject)",
          // dataIndex: "endDate",
          key: "endDate",
          width: "18%",
          render: (record) => endDateFormatMoment(record),
        },
      ],
    },
    {
      title: "Status",
      width: "5%",
      ...filteredOrderAcceptRejectReturn(),
      render: (record) => (
        <div>
          {(() => {
            if (record.statues_id == 1) {
              return;
            } else if (record.statues_id == 2) {
              return <Tag color="green">Using</Tag>;
            } else if (record.statues_id == 3) {
              return <Tag color="volcano">Reject</Tag>;
            } else if (record.statues_id == 4) {
              return <Tag color="purple">Had Taken</Tag>;
            }
          })()}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const onSuccess = ({ data }) => {
      //   console.log(data);
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.userTracking().then(onSuccess).catch(onFailure);

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
    userAPI.userTracking().then(onSuccess).catch(onFailure);
  };

  return (
    <>
      <Fragment>
        <Button
          icon={<ReloadOutlined style={flexCommon} />}
          onClick={handleRefesh}
          type="primary"
          style={{ float: "right", marginRight: "14%" }}
        >
          Refesh
        </Button>
      </Fragment>
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
            defaultPageSize: ["4"],
          }}
        />
      </div>
    </>
  );
}

export default TableHistoryListUser;
