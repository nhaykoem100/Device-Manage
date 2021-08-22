import { notification } from "antd";

export const notifiError = (param) => {
  notification.error({
    message: <b>ERROR</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
  });
};
export const notifiErrorTopLeft = (param) => {
  notification.error({
    message: <b>ERROR</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
    placement: "topLeft",
  });
};
export const notifiSuccess = (param) => {
  notification.success({
    message: <b>SUCCESS</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
  });
};
export const notifiSuccessTopLeft = (param) => {
  notification.success({
    message: <b>SUCCESS</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
    placement: "topLeft",
  });
};
export const notifiWarning = (param) => {
  notification.warning({
    message: <b>WARNING</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
  });
};
export const notifiWarningTopLeft = (param) => {
  notification.warning({
    message: <b>WARNING</b>,
    description: param,
    duration: 3,
    style: { marginTop: "30px" },
    className: "nofi-err",
    placement: "topLeft",
  });
};
