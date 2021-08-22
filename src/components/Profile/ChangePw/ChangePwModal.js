import { Button, Input, Form, Modal } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";
import userAPI from "../../../util/userAPI";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 14,
  },
};

function ChangePwModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [oldPW, setoldPW] = useState("");
  const [newPW, setnewPW] = useState("");
  const [newPWRepeated, setnewPWRepeated] = useState("false");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = (v) => {
    console.log(v);
    const clone = {
      old_password: v.currentpw,
      password: v.newpw,
    };
    if (newPW == newPWRepeated && newPW != oldPW) {
      const onSuccess = ({ data }) => {
        setIsModalVisible(false);
        notifiSuccess("Success to change Password");
      };

      const onFailure = (err) => {
        console.log(err);
        if (err == "Error: Request failed with status code 400") {
          notifiError("Wrong Old Password!");
        }
      };
      userAPI.changePW(clone).then(onSuccess).catch(onFailure);
    } else if (newPW != newPWRepeated) {
      notifiError("New Password is not confirm!");
    } else if (oldPW == newPW && oldPW == newPWRepeated) {
      notifiError("New Password is same Old Password!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  return (
    <Fragment>
      <Button
        type="primary"
        className="pw-btn-change"
        size="small"
        onClick={showModal}
      >
        Change
      </Button>
      <Modal
        title="Change Password"
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
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            name="currentpw"
            label="Current Password:"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              onChange={(e) => {
                setoldPW(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="newpw"
            label="New Password:"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              onChange={(e) => {
                setnewPW(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="newpwrepeated"
            label="New Password Repeated:"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              onChange={(e) => {
                setnewPWRepeated(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default ChangePwModal;
