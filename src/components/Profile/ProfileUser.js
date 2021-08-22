import React, { Fragment, useEffect, useState } from "react";
import { Menu, Modal, Form, Button, Input } from "antd";
import "antd/dist/antd.css";
import "./stylesProfile.css";
import ChangePwModal from "./ChangePw/ChangePwModal";
import userAPI from "../../util/userAPI";
import jwt_decode from "jwt-decode";
import EditProfile from "./EditProfileModal/EditProfile";
import { gridLabelInput } from "../../constants/layout";

function ProfileUser(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datas, setDatas] = useState({});
  const [form] = Form.useForm();

  // const decoded = jwt_decode(localStorage.getItem("token"));
  // console.log(decoded.email);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // window.location.reload();
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      // setDatas(data);
      form.setFieldsValue({
        id: data.id,
        email: data.email,
        displayName: data.displayName,
      });
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.getuser().then(onSuccess).catch(onFailure);
  }, [isModalVisible]);

  const updateEdit = (displayName) => {
    form.setFieldsValue({
      displayName: displayName,
    });
  };

  return (
    <Fragment>
      <Menu.Item
        key="profile"
        onClick={showModal}
        className="Menu-item-profile"
      >
        Profile
      </Menu.Item>
      <Modal
        title="PROFILE"
        visible={isModalVisible}
        closable={false}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,

          <EditProfile updateEdit={updateEdit} />,
        ]}
      >
        {/* <ModalProfile /> */}
        <Form {...gridLabelInput} form={form}>
          <Form.Item name="id" label="ID:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email:">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password:"
            className="profile-form-item-pw"
          >
            <Input disabled value="*********" />

            <ChangePwModal />
          </Form.Item>
          <Form.Item name="displayName" label="DisplayName:">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default ProfileUser;
