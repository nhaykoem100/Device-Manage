import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import userAPI from "../../../util/userAPI";
import { gridLabelInput } from "../../../constants/layout";
import PickerButton from "antd/lib/date-picker/PickerButton";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";
import { flexCommon } from "../../../constants/flex";

function CreateModal(props) {
  const [form] = Form.useForm();
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [id, setId] = useState("");

  // Use form inside UseEffect
  useEffect(() => {}, [showCreateModal]);

  const handleCreateUserShow = () => {
    setShowCreateModal(true);
    form.resetFields();

    //=========Set id cho newUser
    const onSuccess = ({ data }) => {
      // console.log("data vua get:", data, data[0].id);
      form.setFieldsValue({
        id: `${data[0].id + 1}`,
      });
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.users().then(onSuccess).catch(onFailure);
  };
  const handleCancel = () => {
    setShowCreateModal(false);
  };

  const handleSubmit = (v) => {
    const onSuccess = ({ data }) => {
      console.log("data vua them:", v, v.role);
      notifiSuccess("Add successuly!");
      setShowCreateModal(false);
      props.updateCreate(v);
    };

    const onFailure = (err) => {
      console.log(err);
      notifiError("Add failed!");
    };

    userAPI.createUser(v).then(onSuccess).catch(onFailure);
  };

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined style={flexCommon} />}
        type="primary"
        style={{ marginLeft: "14%", marginBottom: "5px" }}
        onClick={handleCreateUserShow}
      >
        Add User
      </Button>

      <Modal
        title="CREATE"
        visible={showCreateModal}
        closable={false}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <PickerButton
            key="submit"
            onClick={form.submit}
            type="primary"
            size="middle"
          >
            Save
          </PickerButton>,
        ]}
      >
        <Form {...gridLabelInput} form={form} onFinish={handleSubmit}>
          <Form.Item name="id" label="ID:">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password:"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="DisplayName:"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* =======selection */}
          <Form.Item name="role" label="Role:" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Select a role"
              // onChange={handleChange}
              //   style={{ width: 200 }}
              //   optionFilterProp="children"
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              //   filterOption={(input, option) =>
              //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   }
            >
              <Select.Option value="1">Admin</Select.Option>
              <Select.Option value="2">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default CreateModal;
