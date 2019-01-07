import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { auth } from "../src/components/firebase";
import {ToastContainer} from 'react-toastify';
import Orders from "./components/orders";
import OrderForm from "./components/orderForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

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
        <ToastContainer/>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/orders/:id" component={OrderForm} />
            <Route path="/orders" render={props=> <Orders {...props} user={this.state.currentUser}/>} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/orders" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
