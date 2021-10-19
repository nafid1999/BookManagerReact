import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavigationBar = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
          width="25"
          width="25"
          height="25"
          alt="brand" />
      </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="#home">Add Book</Nav.Link>
          <Nav.Link href="#features">Book List</Nav.Link>
        </Nav>

    </Navbar>
  );
};

export default NavigationBar;
