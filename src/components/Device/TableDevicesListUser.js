import React, { useEffect, useState } from "react";
// import { Pagination, Table } from "antd";
import "antd/dist/antd.css";
import DataTableDevicesListUser from "./DataTableDevicesListUser";
import userAPI from "../../util/userAPI";

function TableDevicesListUser(props) {
  const [devicesList, setdevicesList] = useState([]);

  useEffect(() => {
    //==============FETCH===============
    // async function fetchDevicesList() {
    //   try {
    //     const requestURL = "https://gorest.co.in/public/v1/users";
    //     const response = await fetch(requestURL);
    //     const responseJSON = await response.json();
    //     // console.log(responseJSON);

    //     const { data } = responseJSON;
    //     setdevicesList(data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // fetchDevicesList();

    const onSuccess = ({ data }) => {
      // alert(" tra ve data!");
      // console.log("data deviceslist by admin:", data);
      setdevicesList(data);
    };

    const onFailure = (err) => {
      console.log(err);
    };

    userAPI.getDevicesInfo().then(onSuccess).catch(onFailure);
  }, []);

  const updateCreate = (v) => {
    // console.log("ben cha:", v);
    const renderUpdateCategory = () => {
      if (v.categories == 1) {
        return "Laptop";
      } else if (v.categories == 2) {
        return "Table";
      } else if (v.categories == 3) {
        return "Mobile";
      } else if (v.categories == 4) {
        return "SmartTV";
      } else if (v.categories == 5) {
        return "Desktop";
      }
    };
    const renderUpdateStatus = () => {
      if (v.statues == 1) {
        return "Run";
      } else if (v.statues == 2) {
        return "Wait";
      }
      // else if (v.statues == 3) {
      //   return "Pending";
      // }
    };
    setdevicesList([
      {
        id: v.id,
        name: v.name,
        categories: v.categories,
        categories_name: renderUpdateCategory(),
        description: v.description,
        statues: v.statues,
        statues_name: renderUpdateStatus(),
      },
      ...devicesList,
    ]);
  };

  const updateEdit = (v) => {
    const renderUpdateCategory = () => {
      if (v.categories == 1) {
        return "Laptop";
      } else if (v.categories == 2) {
        return "Table";
      } else if (v.categories == 3) {
        return "Mobile";
      } else if (v.categories == 4) {
        return "SmartTV";
      } else if (v.categories == 5) {
        return "Desktop";
      }
    };
    const renderUpdateStatus = () => {
      if (v.statues == 1) {
        return "Run";
      } else if (v.statues == 2) {
        return "Wait";
      }
      // else if (v.statues == 3) {
      //   return "Pending";
      // }
    };
    const userListUpdateEdit = [...devicesList];
    userListUpdateEdit.map((e) => {
      if (e.id == v.id) {
        e.name = v.name;
        e.categories = `${v.categories}`;
        e.categories_name = renderUpdateCategory();
        e.description = v.description;
        e.statues = `${v.statues}`;
        e.statues_name = renderUpdateStatus();
      }
    });
    setdevicesList(userListUpdateEdit);
  };

  const updateDeleteDevice = (record) => {
    // console.log("record dlt:", record);
    const dataSource = [...devicesList];
    const index = dataSource.findIndex((e) => e == record);
    dataSource.splice(index, 1);
    setdevicesList(dataSource);
  };

  //==================================Search====================================
  const [searchDeviceName, setsearchDeviceName] = useState("");
  const [searchDeviceEmail, setsearchDeviceEmail] = useState("");
  const [searchDeviceDisplayName, setsearchDeviceDisplayName] = useState("");
  const updateSearchDeviceName = (v) => {
    const params = {
      name: v,
      email: searchDeviceEmail,
      displayname: searchDeviceDisplayName,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchDeviceEmail = (v) => {
    const params = {
      email: v,
      name: searchDeviceName,
      displayname: searchDeviceDisplayName,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceEmail(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchDeviceDisplayName = (v) => {
    const params = {
      displayname: v,
      email: searchDeviceEmail,
      name: searchDeviceName,
    };
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceDisplayName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  //===========CancelSearch==========
  const updateSearchCancelDeviceName = () => {
    const params = {
      name: "",
      email: searchDeviceEmail,
      displayname: searchDeviceDisplayName,
    };
    // console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchCancelDeviceEmail = () => {
    const params = {
      name: searchDeviceName,
      email: "",
      displayname: searchDeviceDisplayName,
    };
    // console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceEmail("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchCancelDeviceDisplayName = () => {
    const params = {
      name: searchDeviceName,
      email: searchDeviceEmail,
      displayname: "",
    };
    // console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setdevicesList(data);
      setsearchDeviceDisplayName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchDevice(params).then(onSuccess).catch(onFailure);
  };
  return (
    <div>
      <DataTableDevicesListUser
        datas={devicesList}
        updateCreate={updateCreate}
        updateEdit={updateEdit}
        updateDeleteDevice={updateDeleteDevice}
        updateSearchDeviceName={updateSearchDeviceName}
        updateSearchDeviceEmail={updateSearchDeviceEmail}
        updateSearchDeviceDisplayName={updateSearchDeviceDisplayName}
        updateSearchCancelDeviceName={updateSearchCancelDeviceName}
        updateSearchCancelDeviceEmail={updateSearchCancelDeviceEmail}
        updateSearchCancelDeviceDisplayName={
          updateSearchCancelDeviceDisplayName
        }
      />
    </div>
  );
}

export default TableDevicesListUser;
