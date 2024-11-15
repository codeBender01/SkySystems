import React from "react";

import { Table } from "antd";

import "../../antd.css";

export default function Panel({ children, columns, rows, isLoading }) {
  return (
    <div className="bg-white rounded-md">
      {children}
      <Table
        loading={isLoading ? isLoading : false}
        className="my-4"
        columns={columns}
        dataSource={rows}
        scroll={{
          x: true,
        }}
      />
    </div>
  );
}
