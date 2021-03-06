import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {
  columns = [
    {
      path: "title",
      label: "ID",
      content: order => (
        <p onClick={() => this.props.onOpen(order)}>{order.title}</p>
      )
    },
    {
      path: "name",
      label: "Անվանում",
      content: order => (
        <p onClick={() => this.props.onOpen(order)}>{order.name}</p>
      )
    },
    {
      path: "numberInStock",
      label: "Ծավալ",
      content: order => (
        <p onClick={() => this.props.onOpen(order)}>{order.numberInStock}</p>
      )
    },
    {
      path: "unit",
      label: "Միավոր",
      content: order => (
        <p onClick={() => this.props.onOpen(order)}>{order.unit}</p>
      )
    },
    {
      path: "dailyRentalRate",
      label: "Վերջնաժամկետ",
      content: order => (
        <p onClick={() => this.props.onOpen(order)}>{order.dailyRentalRate}</p>
      )
    }
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

export default OrdersTable;
