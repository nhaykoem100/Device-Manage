import { Button, Space, Table, Tag } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { categoriesBeautiful } from "../../constants/categories";
import userAPI from "../../util/userAPI";
import moment from "moment";
import {
  endDateFormatMoment,
  startDateFormatMoment,
} from "../../constants/dateTimeMoment";
import {
  getColumnSearchProps,
  sorterID,
  filteredOrderCategoryDevicesNameOfDevicesID,
  filteredOrderAcceptRejectReturn,
  getDateColumnSearchProps,
} from "../../constants/SearchFilter";

function TableTrackingByAdmin(props) {
  const [datas, setdatas] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [searchDeviceName, setsearchDeviceName] = useState("");
  const [searchEmail, setsearchEmail] = useState("");
  const [searchDisplayName, setsearchDisplayName] = useState("");
  const [startDatePicker, setstartDatePicker] = useState("");
  const [endDatePicker, setendDatePicker] = useState("");

  //======================================SEARCH===============================================
  const handleSearchDeviceName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      devicename: v,
      email: searchEmail,
      displayname: searchDisplayName,
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDeviceName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleSearchEmail = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      devicename: searchDeviceName,
      email: v,
      displayname: searchDisplayName,
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchEmail(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleSearchDisplayName = (v, confirm, dataIndex) => {
    confirm();
    const params = {
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: v,
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDisplayName(v);
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
      setstartDatePicker(v[0]);
      setendDatePicker(v[1]);
      console.log(v[0]._d + "  ======  " + v[1]._d);
    }
  };
  const handleSearchDatePicker = (confirm, filtered) => {
    console.log("aaaa:", filtered);
    confirm();
    const params = {
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: searchDisplayName,
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
  const handleCancelSearchDatePicker = (clearFilters) => {
    clearFilters();
    setstartDatePicker("");
    setendDatePicker("");
    const params = {
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: searchDisplayName,
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
  const handleCancelSearchDeviceName = (clearFilters) => {
    clearFilters();
    const params = {
      devicename: "",
      email: searchEmail,
      displayname: searchDisplayName,
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDeviceName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleCancelSearchEmail = (clearFilters) => {
    clearFilters();
    const params = {
      devicename: searchDeviceName,
      email: "",
      displayname: searchDisplayName,
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchEmail("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
  };
  const handleCancelSearchDisplayName = (clearFilters) => {
    clearFilters();
    const params = {
      devicename: searchDeviceName,
      email: searchEmail,
      displayname: "",
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
    const onSuccess = ({ data }) => {
      setdatas(data);
      setsearchDisplayName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchRequestTracking(params).then(onSuccess).catch(onFailure);
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
    {
      title: "Device's Name",
      dataIndex: ["devices_id", "name"],
      key: "name",
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
      width: "15%",
    },
    {
      title: "Used by / Using by",
      children: [
        {
          title: "Email",
          dataIndex: ["user_id", "email"],
          key: "email",
          width: "15%",
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
          width: "15%",
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
      title: "Action",
      dataIndex: "statues_name",
      width: "5%",
      ...filteredOrderAcceptRejectReturn(),
      render: (statues_name) => {
        if (statues_name == "Accept") {
          return <Tag color="green">Accept</Tag>;
        } else if (statues_name == "Reject") {
          return <Tag color="volcano">Reject</Tag>;
        } else if (statues_name == "Return") {
          return <Tag color="purple">Return</Tag>;
        }
      },
    },
  ];

  useEffect(() => {
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdatas(data);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.AdminTracking().then(onSuccess).catch(onFailure);
  }, []);

  return (
    <div className="tablea" style={{ padding: "0px 5%" }}>
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
          defaultPageSize: ["5"],
        }}
      />
    </div>
  );
}

export default TableTrackingByAdmin;
