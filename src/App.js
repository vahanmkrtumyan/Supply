import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { auth } from "../src/components/firebase";
import { ToastContainer } from "react-toastify";
import Orders from "./components/orders";
import OrderForm from "./components/orderForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import OrderView from "./components/orderView";
import Suppliers from "./components/info/suppliers";
import SupplierForm from "./components/info/supplierForm";
import Dalma from "./components/UI/photos/dalma.png";
import Rio from "./components/UI/photos/rio-mall logo.png";
import Erebuni from "./components/UI/photos/erebuni.png";
import Tconstruction from "./components/UI/photos/t-construction.png";
import Teffi from "./components/UI/photos/teffy.png";

class App extends Component {
  state = { currentUser: null };

  async componentDidMount() {
    await auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main>
          <ul className="left-fixed fixed-ad">
            <li>
              <a href="http://www.dalma.am/hy/home" target="_blank">
                <img src={Dalma} alt="" />
              </a>
            </li>
            <li>
              <a href="https://riomall.am" target="_blank">
                <img src={Rio} alt="" />
              </a>
            </li>

            <li>
              <a href="https://www.erebuni-plaza.am/" target="_blank">
                <img src={Erebuni} alt="" />
              </a>
            </li>
          </ul>
          <ul className="right-fixed fixed-ad">
            <li>
              <a href="https://tconstruction.am/" target="_blank">
                <img src={Tconstruction} alt="" />
              </a>
            </li>
            <li>
              <a href="https://riomall.am" target="_blank">
                <img src={Rio} alt="" />
              </a>
            </li>

            <li>
              <a href="" target="_blank">
                <img src={Teffi} alt="" />
              </a>
            </li>
          </ul>
          <div className="container">
            <Switch>
              <Route path="/orders/:id" component={OrderForm} />
              <Route path="/suppliers/:id" component={SupplierForm} />
              <Route path="/orderView/:id" component={OrderView} />
              <Route
                path="/orders"
                render={props => (
                  <Orders {...props} user={this.state.currentUser} />
                )}
              />
              <Route
                path="/suppliers"
                render={props => (
                  <Suppliers {...props} user={this.state.currentUser} />
                )}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/orders" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
