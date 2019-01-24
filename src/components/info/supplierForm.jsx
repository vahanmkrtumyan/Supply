import React from "react";
import { database } from "../firebase";
import Joi from "joi-browser";
import Form from "../common/form";

class SupplierForm extends Form {
  state = {
    suppliers: [],
    data: {
      id: "1",
      title: "",
      name: "",
      numberInStock: "",
      dailyRentalRate: "",
      contact: "",
      imageURL: "0",
      comment: "",
      fileName: ""
    },
    contacts: [
      { id: "09345639", name: "Իգոր" },
      { id: "099910301", name: "Արարատ" },
      { id: "077450210", name: "Վահե" }
    ],
    errors: {},
    disabled: ""
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
    imageURL: Joi.string().label("Նկար"),
    comment: Joi.string()
      .required()
      .label("Մեկնաբանություն")
  };

  componentDidMount() {
    database.ref("suppliers").on("value", snapshot => {
      if (snapshot.val() !== null) {
        const datas = Object.values(snapshot.val());

        this.setState({ suppliers: datas }, () => {
          const getsupplier = id => {
            return this.state.suppliers.filter(m => m.id === id);
          };
          const supplierId = this.props.match.params.id;
          if (supplierId === "new") return;
          const supplier = getsupplier(supplierId);
          if (!supplier) return this.props.history.replace("/not-found");
          this.setState({ data: this.mapToViewModel(supplier[0]) });
        });
      }
    });
  }

  mapToViewModel(supplier) {
    return {
      id: supplier.id,
      title: supplier.title,
      name: supplier.name,
      numberInStock: supplier.numberInStock,
      dailyRentalRate: supplier.dailyRentalRate,
      contact: supplier.contact,
      comment: supplier.comment,
      imageURL: supplier.imageURL || "",
      fileName: supplier.fileName || "",
      count: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: this.state.data.name,
      title: this.state.data.title,
      name: this.state.data.name,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate,
      contact: this.state.data.contact,
      comment: this.state.data.comment,
      imageURL:
        this.state.data.imageURL === "0" ? "" : this.state.data.imageURL,
      fileName: this.state.data.fileName || "0",
      count: this.state.data.count || 0
    };
    database
      .ref()
      .child("suppliers")
      .child(this.state.data.title)
      .set(data);

    this.props.history.push("/suppliers");
  };

  render() {
    return (
      <div className="box form w-550">
        <h2>Նոր հայտարարություն</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "ID", "", "1")}
          {this.renderInput("name", "Ապրանք")}
          {this.renderInput("numberInStock", "Ծավալ", "number")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
          {this.renderSelect("contact", "Կոնտակտ", this.state.contacts)}
          {this.renderInput("comment", "Մեկնաբանություն")}
          <div className="pt-15">
            <button className="btn btn-primary" disabled={!this.state.disabled}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SupplierForm;
