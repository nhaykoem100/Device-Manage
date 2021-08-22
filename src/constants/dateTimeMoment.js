import { Tag } from "antd";
import moment from "moment";

export const startDateFormatMoment = (record) => {
  if (record.statues_name === "Return") {
    return (
      <Tag color="purple">
        {moment(record.startDate).zone(0).format("HH:mm:ss a, DD/MM/YYYY ")}
      </Tag>
    );
  } else if (record.statues_name === "Reject") {
    // console.log(record.statues_name);
    return (
      <Tag color="volcano">
        {moment(record.createdDate).zone(0).format("HH:mm:ss a, DD/MM/YYYY ")}
      </Tag>
    );
  } else if (record.statues_name === "Accept") {
    // console.log("a", record.statues_name);
    return (
      <Tag color="green">
        {moment(record.startDate).zone(0).format("HH:mm:ss a, DD/MM/YYYY ")}
      </Tag>
    );
  }
};

export const endDateFormatMoment = (record) => {
  // console.log("aaa:", record);
  if (record.statues_name === "Return") {
    return (
      <Tag color="purple">
        {moment(record.endDate).zone(0).format("HH:mm:ss a, DD/MM/YYYY ")}
      </Tag>
    );
  } else if (record.statues_name === "Reject") {
    // console.log(record.statues_name);
    return (
      <Tag color="volcano">
        {moment(record.deletedDate).zone(0).format("HH:mm:ss a, DD/MM/YYYY ")}
      </Tag>
    );
  } else if (record.statues_name === "Accept") {
    // console.log(record.statues_name);
    return <Tag color="green">Using</Tag>;
  }
};
