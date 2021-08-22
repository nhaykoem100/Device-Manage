import {
  Button,
  Input,
  Space,
  Checkbox,
  Row,
  Divider,
  DatePicker,
  Form,
} from "antd";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { flexCommon } from "./flex";
import Highlighter from "react-highlight-words";
import { Fragment } from "react";
import styled from "styled-components";

export const filteredOrderCategoryDevicesNameOfDevicesID = () => ({
  filters: [
    { text: "Mobile", value: "Mobile" },
    { text: "Table", value: "Table" },
    { text: "Laptop", value: "Laptop" },
    { text: "Desktop", value: "Desktop" },
    { text: "SmartTV", value: "SmartTV" },
  ],
  onFilter: (value, record) =>
    record.devices_id.categories_name.indexOf(value) === 0,
});

export const filteredOrderCategoryNormal = () => ({
  filters: [
    { text: "Mobile", value: "Mobile" },
    { text: "Table", value: "Table" },
    { text: "Laptop", value: "Laptop" },
    { text: "Desktop", value: "Desktop" },
    { text: "SmartTV", value: "SmartTV" },
  ],
  onFilter: (value, record) => record.categories_name.indexOf(value) === 0,
});

export const filteredOrderAcceptRejectReturn = () => ({
  filters: [
    { text: "Accept", value: "Accept" },
    { text: "Reject", value: "Reject" },
    { text: "Return", value: "Return" },
  ],
  onFilter: (value, record) => record.statues_name.indexOf(value) === 0,
});

export const filteredOrderRunWait = () => ({
  filters: [
    { text: "Run", value: "Run" },
    { text: "Wait", value: "Wait" },
  ],
  onFilter: (value, record) => record.statues_name.indexOf(value) === 0,
});

export const filteredOrdeRoleNormal = (handleSearchRole) => ({
  filters: [
    { text: "Admin", value: "admin" },
    { text: "User", value: "user" },
  ],
  // onFilter: (value) => handleSearchRole(value),
  onFilter: (value, record) => record.role_name === value,
  // onFilter: (value, record) => record.role_name.indexOf(value) === 0,
});

export const sorterID = () => ({
  sorter: (a, b) => a.id - b.id,
  // sortOrder: sortedInfo.columnKey === "categories_name" && sortedInfo.order,
});

export const getColumnSearchProps = (
  dataIndex,
  handleSearch,
  handleCancelSearch,
  searchInput,
  handlNutIcon,
  searchedColumn,
  searchText
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        style={{ marginBottom: 8, display: "block" }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
        }}
      />
      <Space>
        <Button
          icon={<SearchOutlined style={flexCommon} />}
          size="small"
          type="primary"
          style={{ width: 90 }}
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        >
          Search
        </Button>
        <Button
          style={{ width: 90 }}
          size="small"
          type="primary"
          ghost
          onClick={(e) => {
            handleCancelSearch(clearFilters);
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{ color: filtered ? "#1890ff" : undefined }}
      // onClick={handlNutIcon(filtered)}
    />
  ),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current.select());
    }
  },
  // render: (text) =>
  //   searchedColumn === dataIndex ? (
  //     <Highlighter
  //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //       searchWords={[searchText]}
  //       autoEscape
  //       textToHighlight={text ? text.toString() : ""}
  //     />
  //   ) : (
  //     text
  //   ),
});

export const getRoleColumnSearchProps = (
  dataIndex,
  handleSearch,
  handleCancelSearch,
  searchedColumn,
  searchText
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <>
        <Checkbox.Group
          style={{ marginBottom: 8, display: "block" }}
          // value={selectedKeys[0]}
          onChange={(e) => {
            console.log(e);
            // setSelectedKeys(e);
          }}
        >
          <Row>
            <Checkbox style={{ padding: 5 }} value="admin">
              admin
            </Checkbox>
          </Row>
          <Row>
            <Checkbox style={{ padding: 5 }} value="user">
              user
            </Checkbox>
          </Row>
        </Checkbox.Group>
      </>
      <Space>
        <Button
          style={{ width: 50 }}
          // icon={<SearchOutlined style={flexCommon} />}
          size="small"
          type="primary"
          onClick={() => handleSearch(setSelectedKeys, confirm)}
        >
          OK
        </Button>
        <Button
          // style={{ width: 90 }}
          size="small"
          type="primary"
          ghost
          onClick={(e) => {
            handleCancelSearch();
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  // render: (text) =>
  //   searchedColumn === dataIndex ? (
  //     <Highlighter
  //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //       searchWords={[searchText]}
  //       autoEscape
  //       textToHighlight={text ? text.toString() : ""}
  //     />
  //   ) : (
  //     text
  //   ),
});

// const VerticalDatePickerRangePicker = styled(DatePicker.RangePicker)`
//   .ant-form-item {
//     box-sizing: border-box;
//     margin-bottom: -10px !important;
//   }
// `;
export const getDateColumnSearchProps = (
  handleChoosingDatPicker,
  handleSearch,
  handleCancelSearch,
  startDate,
  endDate,
  searchInput,
  handlNutIcon
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    filtered,
  }) => (
    <>
      <div style={{ padding: 16 }}>
        <DatePicker.RangePicker
          // ref={searchInput}
          onChange={(e) => {
            handleChoosingDatPicker(e);
          }}
          value={[startDate, endDate]}
          dateRender={(current) => {
            const style = {};
            if (current.date() === 1) {
              style.border = "1px solid #1890ff";
              style.borderRadius = "50%";
            }
            return (
              <div className="ant-picker-cell-inner" style={style}>
                {current.date()}
              </div>
            );
          }}
        />
      </div>
      <div style={{ padding: "8px 16px 16px 16px" }}>
        <Space>
          <Button
            icon={<SearchOutlined style={flexCommon} />}
            size="small"
            type="primary"
            style={{ width: 135, marginRight: 8 }}
            onClick={() => handleSearch(confirm, filtered)}
          >
            Search
          </Button>
          <Button
            style={{ width: 135 }}
            size="small"
            type="primary"
            ghost
            onClick={(e) => {
              handleCancelSearch(clearFilters);
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    </>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{ color: filtered ? "#1890ff" : undefined }}
      // onClick={handlNutIcon(filtered)}
    />
  ),
  // onFilterDropdownVisibleChange: (visible) => {
  //   if (visible) {
  //     setTimeout(() => searchInput.current.select());
  //   }
  // },
});
