import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase";
import CurrentUser from "./currentUser";
import SignIn from "./signin";
import logo from "./UI/photos/logo.png";

class Navbar extends Component {
  state = { currentUser: null, loading: true };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser, loading: false });
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <nav className="navbar">
        {/*<button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>*/}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav row flex">
            <div className="col-sm-4">
              <NavLink className="logo" to="/orders">
                <img src={logo} alt="Logo" />
              </NavLink>
            </div>

            <div className="col-sm-8 flex justify-end">
              <p className="nav-link">
                email։ shinborsa@gmail.com
              </p>
              <p className="nav-link">
                Հեռ։ 044001492
              </p>
              {currentUser && <CurrentUser user={currentUser} />}
              {!this.state.loading && !currentUser && <SignIn />}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
