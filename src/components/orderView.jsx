import React, { Component } from "react";
import classes from "../components/UI/Modal/modal.css"

class OrderView extends Component {
  handleSubmit = () => {
    this.props.history.push("/orders");
  };

  render() {
    const order = this.props.order;
console.log(classes.Modal)
    return (
      <div className={classes.Modal}>
        <h2>{order.id}</h2>
        <button className="btn btn-primary btn-sm" onClick={this.props.close}>
          Վերադառնալ
        </button>
      </div>
    );
  }
}

export default OrderView;
