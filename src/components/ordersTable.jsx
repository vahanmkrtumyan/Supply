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
          <button className="btn-icon edit"><i className="fa fa-pencil"></i></button>
        </Link>
      )
    },
    {
      key: "delete",
      content: order => (
        <button
          onClick={() => this.props.onDelete(order.id)}
          className="btn-icon delete"
        >
          <i className="fa fa-trash"></i>
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
