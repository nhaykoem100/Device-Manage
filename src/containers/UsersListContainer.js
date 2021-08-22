import React from "react";
import TableUserManage from "../components/User/TableUserManage";
import UserMangeTitle from "../components/User/UserMangeTitle";

function UsersListContainer(props) {
  return (
    <div>
      <UserMangeTitle />
      <TableUserManage />
    </div>
  );
}

export default UsersListContainer;
