import React, { Component } from "react";
import Table from "./common/table";

class OrdersTableUser extends Component {
  
  columns = [
    {
      path: "title",
      label: "Հայտարարության համար" },
    { path: "name", label: "Անվանում" },
    { path: "numberInStock", label: "Ծավալ" },
    { path: "dailyRentalRate", label: "Վերջնաժամկետ" },
  ];

  render() {
    const { orders, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={orders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default OrdersTableUser;
