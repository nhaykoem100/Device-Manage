import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import userAPI from "../../../util/userAPI";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";
import { gridLabelInput } from "../../../constants/layout";
import { flexCommon } from "../../../constants/flex";

function CreateModalDevices(props) {
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
        feature_img: null,
        statues: `2`,
      });
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.getDevicesInfo().then(onSuccess).catch(onFailure);
  };

  const handleCancel = () => {
    setShowCreateModal(false);
  };

  const handleSubmit = (v) => {
    // console.log("data:", v);
    const clone = {
      feature_img: null,
      name: v.name,
      categories: v.categories,
      description: v.description,
      statues: v.statues,
    };
    const onSuccess = ({ data }) => {
      notifiSuccess("Add successuly!");
      setShowCreateModal(false);
      props.updateCreate(v);
    };

    const onFailure = (err) => {
      console.log(err);
      notifiError("Add failed!");
    };

    userAPI.createDevice(clone).then(onSuccess).catch(onFailure);
  };

  return (
    <Fragment>
      <Button
        icon={<PlusCircleOutlined style={flexCommon} />}
        type="primary"
        style={{ marginLeft: "0.1%", marginBottom: "13px" }}
        onClick={handleCreateUserShow}
      >
        Add Device
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
          <Button
            key="submit"
            onClick={form.submit}
            type="primary"
            size="middle"
          >
            Save
          </Button>,
        ]}
      >
        <Form {...gridLabelInput} form={form} onFinish={handleSubmit}>
          <Form.Item name="id" label="ID:">
            <Input disabled />
          </Form.Item>

          <Form.Item name="feature_img" label="Image:">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="name"
            label="Device's Name:"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Category:"
            rules={[{ required: true }]}
          >
            <Select showSearch placeholder="Select a category">
              <Select.Option value="1">Laptop</Select.Option>
              <Select.Option value="2">Table</Select.Option>
              <Select.Option value="3">Mobile</Select.Option>
              <Select.Option value="4">SmartTV</Select.Option>
              <Select.Option value="5">Desktop</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description:"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* =======selection */}
          <Form.Item
            name="statues"
            label="Status:"
            rules={[{ required: true }]}
          >
            <Select
              disabled
              showSearch
              placeholder="Select Status"
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
              <Select.Option value="1">Run</Select.Option>
              <Select.Option value="2">Wait</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default CreateModalDevices;
