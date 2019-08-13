import React from "react";
import { storage, database, firestore } from "./firebase";
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
      unit: "",
      dailyRentalRate: "",
      imageURL: "as",
      comment:
        "Սույն հայտարարությունը վերաբերում է միայն ՀՀ տարածքում գործող կազմակերպությունների համար։",
      fileName: "as",
      count: 0
    },
    errors: {},
    disabled: false,
    progress: 0
  };

  schema = {
    id: Joi.number().required(),
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
    unit: Joi.string()
      .required()
      .label("Միավոր"),

    imageURL: Joi.string().label("Նկար"),
    comment: Joi.string().label("Մեկնաբանություն"),
    fileName: Joi.string(),
    count: Joi.number().label("Քանակ")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  componentDidMount() {
    firestore
      .collection("orders")
      .where("title", "==", `${this.props.match.params.id}`)
      // .where(`id`,`==`,`${this.props.match.params.id}`)
      .onSnapshot(snapshot => {
        if (snapshot.docs !== null) {
          const datas = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });

          this.setState({ orders: datas }, () => {
            console.log(datas);
            const getOrder = id => {
              return this.state.orders.filter(m => m.id == id);
            };
            const OrderId = this.props.match.params.id;
            if (OrderId === "new") return;
            const order = getOrder(OrderId);
            console.log(order, OrderId);

            if (!order) return this.props.history.replace("/not-found");
            this.setState({ data: this.mapToViewModel(order[0]) }, () =>
              console.log(this.state.data)
            );
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
      unit: order.unit,
      dailyRentalRate: order.dailyRentalRate,
      comment: order.comment,
      imageURL: order.imageURL || "as",
      fileName: order.fileName || "as",
      count: order.count
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    const data = {
      id: this.state.data.title,
      title: this.state.data.title,
      name: this.state.data.name,
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate,
      unit: this.state.data.unit,
      comment: this.state.data.comment,
      imageURL:
        this.state.data.imageURL === "as" ? "" : this.state.data.imageURL,
      fileName: this.state.data.fileName || "0",
      count: this.state.data.count || 0
    };
    firestore
      .collection("orders")
      .doc(`${this.state.data.title}`)
      .set(data);
    // database
    //   .ref()
    //   .child("orders")
    //   .child(this.state.data.title)
    //   .set(data);

    this.props.history.push("/orders");
  };

  handleSelect = e => {
    const file = e.target.files[0];

    var metadata = {
      conetentType: "image/jpeg"
    };
    var storageRef = storage.ref("images/" + file.name);
    var uploadTask = storageRef.put(file, metadata);
    const data = this.state.data;
    data.fileName = file.name;

    this.setState({ data });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed", // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState();
        var prg = progress.toString();
        if (0 < progress < 1) {
          this.setState({ disabled: "disabled" });
          console.log(this.state.disabled);
        }
        if ((progress = 25)) {
          this.setState({ progress });
        }
        if ((progress = 50)) {
          this.setState({ progress });
        }
        if ((progress = 100)) {
          this.setState({ progress });
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
          {this.renderInput("numberInStock", "Ծավալ")}
          {this.renderInput("unit", "Միավոր")}
          {this.renderInput("dailyRentalRate", "Վերջնաժամկետ", "date")}
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
            <progress value={this.state.progress} max="100" />
            <br />
            <br />
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default OrderForm;
