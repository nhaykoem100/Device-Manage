import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import userAPI from "../../../util/userAPI";
import { gridLabelInput } from "../../../constants/layout";
import { notifiSuccess } from "../../../constants/NotificationConstants";
import { flexCommon } from "../../../constants/flex";

function EditModal(props) {
  const [form] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {}, [showEditModal]);

  const userEdit = (record) => {
    setShowEditModal(true);

    // console.log("record la: ", record);

    form.setFieldsValue({
      id: record.id,
      email: record.email,
      displayName: record.displayName,
      role: `${record.role}`,
    });
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (v) => {
    // console.log("test Submit:", v);
    const clone = {
      displayName: v.displayName,
      role: v.role,
    };

    const onSuccess = ({ data }) => {
      //   console.log("data la", data);
      // window.location.reload();
      notifiSuccess("Edit successfully!");
      setShowEditModal(false);
      props.updateEdit(v.displayName, v.role, v.id);
    };

    const onFailure = (err) => {
      console.log(err);
    };
    // console.log("edit la: ", clone);
    userAPI.editUserByID(v.id, clone).then(onSuccess).catch(onFailure);
  };

  return (
    <Fragment>
      <Button
        icon={<EditOutlined />}
        style={flexCommon}
        type="primary"
        ghost
        onClick={() => {
          userEdit(props.Record);
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
          <Button key="edit" onClick={form.submit} type="primary">
            Save
          </Button>,
        ]}
      >
        <Form {...gridLabelInput} form={form} onFinish={handleSubmit}>
          <Form.Item label="ID:" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email:" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="DisplayName:"
            name="displayName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* =======selection */}
          <Form.Item label="Role:" name="role" rules={[{ required: true }]}>
            <Select
              // showSearch
              placeholder="Select a role"
              // labelInValue
              // value={{ value: `${role}` }}
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
              <Select.Option value="1">admin</Select.Option>
              <Select.Option value="2">user</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default EditModal;
