import React from "react";
import { database } from "./firebase";
import Form from "./common/form";

class OrderForm extends Form {
  state = {
    orders: [],
    data: {
      id: "",
      title: "",
      name: "",
      numberInStock: "",
      dailyRentalRate: "",
      comment: ""
    }
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
          if (OrderId === "new") return;
          const order = getOrder(OrderId);
          if (!order) return this.props.history.replace("/not-found");
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
      comment: order.comment
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: this.state.data.title,
      title: this.state.data.title,
      name: this.state.data.name,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate,
      comment: this.state.data.comment
    };
    database
      .ref()
      .child("orders")
      .child(this.state.data.title)
      .set(data);


    this.props.history.push("/orders");
  };

  render() {
    return (
      <div>
        <h2>Նոր հայտարարություն</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Հայտարարության համար", "", "1")}
          {this.renderInput("name", "Ապրանք")}
          {this.renderInput("numberInStock", "Ծավալ", "number")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
          {this.renderInput("comment", "Մեկնաբանություն")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
