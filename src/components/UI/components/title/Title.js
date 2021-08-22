import React from "react";
import "antd/dist/antd.css";
import "./style.css";

export default function Title(props) {
  return (
    <div className="header-title">
      <h1>{props.title}</h1>
    </div>
  );
}
