import React from "react";
import { storage, database } from "./firebase";
import Joi from "joi-browser";
import Form from "./common/form";

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
    disabled: false
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
      comment: order.comment,
      imageURL: order.imageURL || "",
      fileName: order.fileName || "",
      count: null
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
      comment: this.state.data.comment,
      imageURL:
        this.state.data.imageURL === "0" ? "" : this.state.data.imageURL,
      fileName: this.state.data.fileName || "0",
      count: this.state.data.count || 0
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

    var metadata = {
      conetentType: "image/jpeg"
    };
    var storageRef = storage.ref();
    var uploadTask = storageRef
      .child("images/" + file.name)
      .put(file, metadata);
    const data = this.state.data;
    data.fileName = file.name;

    this.setState({ data });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed", // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (0 < progress < 1) {
          this.setState({ disabled: "disabled" });
          console.log(this.state.disabled);
        }
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused": // or 'paused'
            console.log("Upload is paused");
            break;
          case "running": // or 'running'
            console.log("Upload is running");
            break;
        }
      },

      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          const data = this.state.data;
          data.imageURL = downloadURL;

          this.setState({ data }, () => console.log(this.state.data.imageURL));
          this.setState({ disabled: false });
        });
      }
    );
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
          <div className="upload-btn-wrapper">
            <button className="upload-btn">Upload a file</button>
            <input
              type="file"
              name={this.state.data.name}
              onChange={this.handleSelect}
            />
          </div>
          <div className="pt-15">
            <button className="btn btn-primary" disabled={this.state.disabled}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default OrderForm;
