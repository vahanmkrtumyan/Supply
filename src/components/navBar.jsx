import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase";
import CurrentUser from "./currentUser";
import SignIn from "./signin";
import logo from "./UI/photos/logo.jpg"

class Navbar extends Component {
  state = { currentUser: null, loading: true };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser, loading: false });
    });
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          
          <NavLink className="nav-item nav-link" to="/orders">
          <img src={logo} alt="Logo" />
            </NavLink>
            <NavLink className="nav-item nav-link" to="/orders">
              Հայտարարություններ
            </NavLink>
            {!this.state.loading && !currentUser && <SignIn />}

            {currentUser && <CurrentUser user={currentUser} />}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
