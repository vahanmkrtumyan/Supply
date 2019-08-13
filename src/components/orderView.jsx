import React, { Component } from "react";
import "../components/UI/Modal/modal.css";

class OrderView extends Component {
  handleSubmit = () => {
    this.props.history.push("/orders");
  };

  render() {
    const order = this.props.order;
    return this.props.show ? (
      <div className="Modal">
        <table className="table table-hover">
          <tbody>
            <tr>
              <td>Հայտարարության ID</td>
              <td>{order.id}</td>
            </tr>
            <tr>
              <td>Ապրանքի անվանում</td>
              <td>{order.name}</td>
            </tr>
            <tr>
              <td>Ապրանքի ծավալ</td>
              <td>{order.numberInStock}</td>
            </tr>
            <tr>
              <td>Միավոր</td>
              <td>{order.unit}</td>
            </tr>
            <tr>
              <td>Մատակարարման վերջնաժամեկտ</td>
              <td>{order.dailyRentalRate}</td>
            </tr>
            <tr>
              <td>Մեկնաբանություն</td>
              <td>{order.comment}</td>
            </tr>
          </tbody>
        </table>
        <div
          className="img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src={order.imageURL} style={{ maxHeight: "300px" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <button className="btn btn-primary btn-sm" onClick={this.props.close}>
            Վերադառնալ
          </button>
        </div>
      </div>
    ) : null;
  }
}

export default OrderView;
