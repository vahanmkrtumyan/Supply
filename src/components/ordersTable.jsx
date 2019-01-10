import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {
  columns = [
    {
      path: "title",
      label: "Հայտարարության համար",
      content: order => <p onClick={()=>this.props.onOpen(order)}>{order.title}</p>
    },
    { path: "name", label: "Անվանում" },
    { path: "numberInStock", label: "Ծավալ" },
    { path: "dailyRentalRate", label: "Վերջնաժամկետ" },
    { path: "contact", label: "Կոնտակտ" },
    {
      key: "update",
      content: order => (
        <Link to={`/orders/${order.id}`}>
          <button className="btn btn-primary btn-sm">Update</button>
        </Link>
      )
    },
    {
      key: "delete",
      content: order => (
        <button
          onClick={() => this.props.onDelete(order.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
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
