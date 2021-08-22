import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import userAPI from "../../../util/userAPI";
import {
  notifiError,
  notifiSuccess,
} from "../../../constants/NotificationConstants";
import { gridLabelInput } from "../../../constants/layout";
import { flexCommon } from "../../../constants/flex";

function EditModalDevice(props) {
  const [form] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  // const [id, setId] = useState("");

  // Use form inside UseEffect
  useEffect(() => {}, [showEditModal]);

  const handleEditUserShow = (record) => {
    setShowEditModal(true);
    // console.log("record: ", record);

    const onSuccess = ({ data }) => {
      // console.log("data vua get:", data, data[0].id);
      form.setFieldsValue({
        id: record.id,
        feature_img: null,
        name: record.name,
        categories: `${record.categories}`,
        description: record.description,
        statues: `${record.statues}`,
      });
    };
    const onFailure = (err) => {
      console.log(err);
    };
    userAPI.getDevicesInfo().then(onSuccess).catch(onFailure);
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (v) => {
    const clone = {
      feature_img: null,
      name: v.name,
      categories: v.categories,
      description: v.description,
      statues: v.statues,
    };
    console.log("data sau khi edit device by admin:", v, clone);
    // console.log("clone:", clone);
    const onSuccess = ({ data }) => {
      notifiSuccess("Add successfully!");
      setShowEditModal(false);
      props.updateEdit(v);
    };
    const onFailure = (err) => {
      console.log(err);
      notifiError("Add failed!");
    };
    userAPI.editDevice(v.id, clone).then(onSuccess).catch(onFailure);
  };

  return (
    <Fragment>
      <Button
        icon={<EditOutlined />}
        type="primary"
        ghost
        style={flexCommon}
        onClick={() => {
          handleEditUserShow(props.record);
        }}
      >
        Edit
      </Button>
      <Modal
        title="EDIT"
        visible={showEditModal}
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
            // rules={[{ required: true }]}
          >
            <Select showSearch placeholder="Select a category" disabled>
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
            // rules={[{ required: true }]}
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

export default EditModalDevice;
