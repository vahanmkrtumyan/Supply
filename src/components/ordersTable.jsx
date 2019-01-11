import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {
  columns = [
    {
      path: "title",
      label: "ID",
      content: order => <p onClick={()=>this.props.onOpen(order)}>{order.title}</p>
    },
    { path: "name", label: "Անվանում", content: order => <p onClick={()=>this.props.onOpen(order)}>{order.name}</p> },
    { path: "numberInStock", label: "Ծավալ", content: order => <p onClick={()=>this.props.onOpen(order)}>{order.numberInStock}</p> },
    { path: "dailyRentalRate", label: "Վերջնաժամկետ", content: order => <p onClick={()=>this.props.onOpen(order)}>{order.dailyRentalRate}</p> },
    { path: "contact", label: "Կոնտակտ", content: order => <p onClick={()=>this.props.onOpen(order)}>{order.contact}</p> },
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
