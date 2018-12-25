import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "./firebase";
import CurrentUser from "./currentUser";
import SignIn from "./signin";

class Navbar extends Component {
  state = { currentUser: null };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
      console.log(this.state.currentUser.email);
    });
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand sm" to="/">
          Տաշիր պորտալ
        </Link>
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
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
            {!currentUser && <SignIn />}
            {currentUser && <CurrentUser user={currentUser} />}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
