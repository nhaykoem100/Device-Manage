import React from "react";
import HistoryListUserTitle from "../components/DevicesHistory/HistoryListUserTitle";
import TableHistoryListUser from "../components/DevicesHistory/TableHistoryListUser";

export default function HistoryListUser() {
  return (
    <div>
      <HistoryListUserTitle />
      <TableHistoryListUser />
    </div>
  );
}
