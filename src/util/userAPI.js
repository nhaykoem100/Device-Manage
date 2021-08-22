import axiosClient from "./axiosClient";
import queryString from "query-string";

const userAPI = {
  getAll: () => {
    const url = "/users/login/";
    return axiosClient.get(url);
  },
  login: (param = null) => {
    const url = "users/login/";
    return axiosClient.post(url, param);
  },
  logout: (param) => {
    const url = "users/logout/";
    return axiosClient.post(url, param);
  },
  users: () => {
    const url = "users/";
    return axiosClient.get(url);
  },
  edituser: (param = null) => {
    const url = "users/user/";
    return axiosClient.put(url, param);
  },
  changePW: (param) => {
    const url = "users/user/password/";
    return axiosClient.put(url, param);
  },

  //========User Manage=========
  getuser: () => {
    const url = "users/user/";
    return axiosClient.get(url);
  },
  getUserByID: (param) => {
    const url = `users/${param}/`;
    // console.log(url);
    return axiosClient.get(url);
  },
  editUserByID: (id, param = null) => {
    const url = `users/${id}/`;
    // console.log(url);
    return axiosClient.put(url, param);
  },
  createUser: (param) => {
    const url = "users/";
    return axiosClient.post(url, param);
  },
  deleteUser: (param) => {
    const url = `users/${param}/delete/`;
    return axiosClient.put(url);
  },

  //======Devices
  getDevicesInfo: () => {
    const url = "devices/";
    return axiosClient.get(url);
  },
  createDevice: (param) => {
    const url = "devices/";
    return axiosClient.post(url, param);
  },
  editDevice: (id, param) => {
    const url = `devices/${id}/`;
    return axiosClient.put(url, param);
  },
  deleteDevice: (id) => {
    const url = `devices/${id}/delete/`;
    return axiosClient.put(url);
  },

  //======request========
  listRequest: () => {
    const url = "requests/";
    return axiosClient.get(url);
  },
  requestDevice: (param) => {
    const url = "requests/";
    return axiosClient.post(url, param);
  },
  acceptAction: (param) => {
    const url = `requests/accept/${param}/`;
    return axiosClient.put(url);
  },
  rejectAction: (param) => {
    const url = `requests/reject/${param}/`;
    return axiosClient.put(url);
  },
  takeDeviceByAdmin: (param) => {
    const url = `requests/return/admin/${param}/`;
    return axiosClient.put(url);
  },
  listAccept: () => {
    const url = "requests/accept/";
    return axiosClient.get(url);
  },

  //========tracking==========
  userTracking: () => {
    const url = "requests/user/tracking/";
    return axiosClient.get(url);
  },
  userManageRequest: () => {
    const url = "requests/user/";
    return axiosClient.get(url);
  },
  AdminTracking: () => {
    const url = "requests/all/";
    return axiosClient.get(url);
  },
  rejectRequestByUser: (param) => {
    const url = `requests/reject/user/${param}/`;
    return axiosClient.put(url);
  },

  //=======Search========
  searchUser: (params) => {
    const url = `users/search`;
    return axiosClient.get(url, { params });
  },
  searchDevice: (params) => {
    const url = `devices/search`;
    return axiosClient.get(url, { params });
  },
  searchRequest: (params) => {
    const url = `requests/search`;
    return axiosClient.get(url, { params });
  },
  searchRequestTracking: (params) => {
    const url = `requests/search/notwait`;
    return axiosClient.get(url, { params });
  },
};

export default userAPI;
