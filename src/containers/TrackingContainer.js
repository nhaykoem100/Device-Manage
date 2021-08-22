import { Table } from "antd";
import React from "react";
import AdminTracking from "../components/Tracking/AdminTracking";
import TableTrackingByAdmin from "../components/Tracking/TableTrackingByAdmin";

function TrackingContainer(props) {
  return (
    <div>
      <AdminTracking />
      <TableTrackingByAdmin />
    </div>
  );
}

export default TrackingContainer;
