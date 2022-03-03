import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavigationBar = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">
        <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"
          width="60"
          height="40"
          alt="brand" />
      </Link>

        <Nav className="me-auto">
          {/* <Link to="/add-book" className="nav-link">Add Book</Link>
          <Link to={"/book-list"} className="nav-link">Book List</Link>a */}
          <Link to={"/user-list"} className="nav-link">User List</Link>
          <Link to={"/add-user"} className="nav-link">Add New User</Link>

        </Nav>

        <Nav className="nav-right">
          <Link to="/register" className="nav-link">Register</Link>
          <Link to={"/login"} className="nav-link">Login</Link>
        </Nav>

    </Navbar>
  );
};

export default NavigationBar;
