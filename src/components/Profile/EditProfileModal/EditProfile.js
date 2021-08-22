import React, { Fragment, useEffect, useState } from "react";
import { Menu, Modal, Form, Button, Input } from "antd";
import "antd/dist/antd.css";
import jwt_decode from "jwt-decode";
import userAPI from "../../../util/userAPI";
import { gridLabelInput } from "../../../constants/layout";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";

function EditProfile(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datas, setDatas] = useState({});
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (v) => {
    console.log("value", v.displayName);
    const clone = {
      displayName: v.displayName,
    };
    const onSuccess = () => {
      setIsModalVisible(false);
      notifiSuccess("Update Successful!");
      props.updateEdit(v.displayName);
    };

    const onFailure = (err) => {
      console.log(err);
      notifiError("Update Failed!");
    };

    userAPI.edituser(clone).then(onSuccess).catch(onFailure);
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      setDatas(data);
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
  }, []);

  return (
    <Fragment>
      <Button onClick={showModal} type="primary">
        Edit
      </Button>
      <Modal
        title="EDIT"
        visible={isModalVisible}
        closable={false}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="edit" onClick={form.submit} type="primary">
            Save
          </Button>,
        ]}
      >
        <Form {...gridLabelInput} form={form} onFinish={onFinish}>
          <Form.Item name="id" label="ID:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email:">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="DisplayName:"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default EditProfile;
