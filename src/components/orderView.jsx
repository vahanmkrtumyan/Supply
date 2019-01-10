import React, { Component } from "react";
import { database } from "./firebase";

class OrderView extends Component {
  state = {
    orders: [],
    data: {
      id: "",
      title: "",
      name: "",
      numberInStock: "",
      dailyRentalRate: "",
      contact: "",
      comment: ""
    },

    errors: {}
  };

  componentDidMount() {
    database.ref("orders").on("value", snapshot => {
      if (snapshot.val() !== null) {
        const datas = Object.values(snapshot.val());

        this.setState({ orders: datas }, () => {
          const getOrder = id => {
            return this.state.orders.filter(m => m.id === id);
          };
          const OrderId = this.props.match.params.id;
          const order = getOrder(OrderId);
          this.setState({ data: this.mapToViewModel(order[0]) });
        });
      }
    });
  }

  mapToViewModel(order) {
    return {
      id: order.id,
      title: order.title,
      name: order.name,
      numberInStock: order.numberInStock,
      dailyRentalRate: order.dailyRentalRate,
      contact: order.contact,
      comment: order.comment
    };
  }

  handleSubmit = () => {
    this.props.history.push("/orders");
  };

  render() {
    return (
      <div>
        <h2>{this.state.data.id}</h2>
        <button className='btn btn-primary btn-sm' onClick={this.handleSubmit}>Վերադառնալ</button>
      </div>
    );
  }
}

export default OrderView;
