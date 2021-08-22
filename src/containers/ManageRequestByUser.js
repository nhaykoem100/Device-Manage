import React from "react";
import ManageRequestByUserTitle from "../components/ManageRequest/ManageRequestByUser/ManageRequestByUserTitle";
import TableManageRequestByUser from "../components/ManageRequest/ManageRequestByUser/TableManageRequestByUser";

function ManageRequestByUser(props) {
  return (
    <div>
      <ManageRequestByUserTitle />
      <TableManageRequestByUser />
    </div>
  );
}

export default ManageRequestByUser;
