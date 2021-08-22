import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import DeviceListUserTitle from "../components/Device/DeviceListUserTitle";
import TableDevicesListUser from "../components/Device/TableDevicesListUser";
import TableDeviceListForUserRole from "../components/Device/UserRole/TableDeviceListForUserRole";
import userAPI from "../util/userAPI";
// import RouterURL from "../routes/RouterURL";

export default function DevicesListUser() {
  const [dataUserLogin, setdataUserLogin] = useState("");
  useEffect(() => {
    const onSuccess = ({ data }) => {
      console.log(data);
      setdataUserLogin(data);
    };

    const onFailure = (err) => {
      console.log(err);
    };

    userAPI.getuser().then(onSuccess).catch(onFailure);
  }, []);

  const renderDataIntoRole = () => {
    // console.log("render id:", dataUserLogin.id);
    if (dataUserLogin.role == 1) {
      return <TableDevicesListUser />;
    }
    return <TableDeviceListForUserRole />;
  };

  return (
    <div>
      <DeviceListUserTitle />
      {renderDataIntoRole()}
    </div>
  );
}
