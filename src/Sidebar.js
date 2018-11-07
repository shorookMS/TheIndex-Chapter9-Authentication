import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

// Logo
import logo from "./assets/theindex.svg";

class Sidebar extends Component {
  render() {
    let logout = (
      <button
        className="btn btn-danger m-2 float-left"
        onClick={this.props.logout}
      >
        Logout
      </button>
    );
    let signup = (
      <div>
        <Link to="/signup" className="btn btn-success m-2 float-left">
          Signup
        </Link>
        <Link to="/login" className="btn btn-info m-2 float-left">
          Login
        </Link>
      </div>
    );

    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
        </section>
        <div className="fixed-bottom">{this.props.user ? logout : signup}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
