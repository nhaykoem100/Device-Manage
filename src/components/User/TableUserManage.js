import React, { useEffect, useState } from "react";
import userAPI from "../../util/userAPI";
import DataTableUserManage from "./DataTableUserManage";
import moment from "moment";

function TableUserManage(props) {
  const [userList, setUserList] = useState([]);

  const updateEdit = (displayName, role, id) => {
    // console.log("data:", data);
    const userListUpdate = [...userList];
    const renderUpdateRole = role == 1 ? "admin" : "user";
    userListUpdate.map((element) => {
      // console.log(element);

      if (id === element.id) {
        element.displayName = displayName;
        element.role = `${role}`;
        element.role_name = renderUpdateRole;
        // const newDate = new Date(element.updatedDate);
        // const convertDate = newDate.toISOString();
        // element.updatedDate = convertDate;
        const mm = moment().add(7, "h").format();
        element.updatedDate = null;
        element.updatedDate = mm;
      }
      // element.updatedDate = moment(element.updatedDate).zone(0).format();
    });
    //================Sort by id
    // userListUpdate.sort((a, b) => a.id - b.id);

    //==============Sort by updatedDate
    // userListUpdate.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));

    // console.log("moment:", moment().format("DD/MM/YYYY kk:mm:ss"));

    // console.log("aaa", userListUpdate);
    // console.log("bbb", userList);
    setUserList(userListUpdate);
  };

  const updateCreate = (v) => {
    // const dataSource = userList;
    // console.log("userlist:", userList);
    // console.log("clone cua userList:", dataSource);
    // console.log("data vua them dc xem o ben cha:", v);
    // const dataFuntion = { newData, ...dataSource };
    // console.log("data sau khi gop:", dataFuntion);
    const renderUpdateRole = v.role == 1 ? "admin" : "user";
    console.log("renderUpdateRole:", v.role, renderUpdateRole);
    setUserList([
      {
        id: v.id,
        email: v.email,
        displayName: v.displayName,
        role_name: renderUpdateRole,
        role: v.role,
      },
      ...userList,
    ]);
  };

  const updateDelete = (record) => {
    const dataSource = [...userList];
    const index = dataSource.findIndex((element) => element == record);
    // console.log("findindex:", index);
    dataSource.splice(index, 1);
    setUserList(dataSource);
  };

  //==============================Search=======================================
  const [searchEmail, setsearchEmail] = useState("");
  const [searchName, setsearchName] = useState("");
  const updateSearchEmail = (v) => {
    const params = {
      email: v,
      name: searchName,
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setUserList(data);
      setsearchEmail(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchUser(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchDisplayName = (v) => {
    const params = {
      name: v,
      email: searchEmail,
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setUserList(data);
      setsearchName(v);
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchUser(params).then(onSuccess).catch(onFailure);
  };

  //=====CancelSearch=====
  const updateSearchCancelEmail = () => {
    const params = {
      email: "",
      name: searchName,
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setUserList(data);
      setsearchEmail("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchUser(params).then(onSuccess).catch(onFailure);
  };
  const updateSearchCancelDisplayName = () => {
    const params = {
      email: searchEmail,
      name: "",
    };
    console.log(params);
    const onSuccess = ({ data }) => {
      // console.log(data);
      setUserList(data);
      setsearchName("");
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.searchUser(params).then(onSuccess).catch(onFailure);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      // alert(" tra ve data!");
      // console.log(data);
      setUserList(data);
    };

    const onFailure = (err) => {
      // console.log(err);
    };
    userAPI.users().then(onSuccess).catch(onFailure);
  }, []);

  return (
    <DataTableUserManage
      datas={userList}
      updateEdit={updateEdit}
      updateCreate={updateCreate}
      updateDelete={updateDelete}
      updateSearchEmail={updateSearchEmail}
      updateSearchDisplayName={updateSearchDisplayName}
      updateSearchCancelEmail={updateSearchCancelEmail}
      updateSearchCancelDisplayName={updateSearchCancelDisplayName}
    />
  );
}

export default TableUserManage;
