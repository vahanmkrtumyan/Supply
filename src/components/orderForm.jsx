import React from "react";
import { storage, database } from "./firebase";
import Joi from "joi-browser";
import Form from "./common/form";
import {} from "firebase";

class OrderForm extends Form {
  state = {
    orders: [],
    data: {
      id: "1",
      title: "",
      name: "",
      numberInStock: "",
      dailyRentalRate: "",
      contact: "",
      comment: ""
    },
    contacts: [
      { id: "Իգոր: 09345639", name: "Իգոր" },
      { id: "Արարատ: 099910301", name: "Արարատ" },
      { id: "Վահե։ 077450210", name: "Վահե" }
    ],
    errors: {}
  };

  schema = {
    id: Joi.string(),
    title: Joi.number()
      .required()
      .label("Հայատարարության համար"),
    name: Joi.string()
      .required()
      .label("Ապրանք"),
    numberInStock: Joi.string()
      .required()
      .label("Ծավալ"),
    dailyRentalRate: Joi.date()
      .required()
      .label("Վերջնաժամկետ"),
    contact: Joi.string()
      .required()
      .label("Կոնտակտ"),
    comment: Joi.string()
      .required()
      .label("Մեկնաբանություն")
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
      contact: order.contact,
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
      contact: this.state.data.contact,
      comment: this.state.data.comment
    };
    database
      .ref()
      .child("orders")
      .child(this.state.data.title)
      .set(data);

    this.props.history.push("/orders");
  };

  handleSelect = e => {
    const file = e.target.files[0];
    this.storageRef = storage.ref("/products").child(this.state.data.id);
    const uploadTask = this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type });
  };

  render() {
    return (
      <div className="box form w-600">
        <h2>Նոր հայտարարություն</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "ID", "", "1")}
          {this.renderInput("name", "Ապրանք")}
          {this.renderInput("numberInStock", "Ծավալ", "number")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
          {this.renderSelect("contact", "Կոնտակտ", this.state.contacts)}
          {this.renderInput("comment", "Մեկնաբանություն")}
          <input
            type="file"
            name='dsfsd'
            onChange={this.handleSelect}
          />
          <br />
          <br />
          <button className="btn btn-primary" disabled={this.validate()}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default OrderForm;
