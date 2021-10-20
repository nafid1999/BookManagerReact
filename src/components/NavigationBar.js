import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavigationBar = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
          
          width="40"
          height="35"
          alt="brand" />
      </Link>

        <Nav className="me-auto">
        
          <Link to="/add-book" className="nav-link">Add Book</Link>
          <Link to={"/book-list"} className="nav-link">Book List</Link>

        </Nav>

    </Navbar>
  );
};

export default NavigationBar;
