import { Tag } from "antd";
import {
  MobileOutlined,
  LaptopOutlined,
  TabletOutlined,
  DesktopOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { flexCommon } from "./flex";

export const categoriesBeautiful = (categories_name) => {
  if (categories_name == "Mobile") {
    return (
      <Tag color="blue" icon={<MobileOutlined style={flexCommon} />}>
        Mobile
      </Tag>
    );
  } else if (categories_name == "Table") {
    return (
      <Tag color="green" icon={<TabletOutlined style={flexCommon} />}>
        Table
      </Tag>
    );
  } else if (categories_name == "Laptop") {
    return (
      <Tag color="volcano" icon={<LaptopOutlined style={flexCommon} />}>
        Laptop
      </Tag>
    );
  } else if (categories_name == "Desktop") {
    return (
      <Tag color="purple" icon={<DesktopOutlined style={flexCommon} />}>
        Desktop
      </Tag>
    );
  } else if (categories_name == "SmartTV") {
    return (
      <Tag color="gold" icon={<FundOutlined style={flexCommon} />}>
        SmartTV
      </Tag>
    );
  }
};
