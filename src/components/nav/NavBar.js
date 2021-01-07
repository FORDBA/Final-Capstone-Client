import React from "react"
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import "./NavBar.css"
import Logo from "./Tax Return Manager Logo.png"
import { Button } from "react-bootstrap"

export const NavBar = (props) => {
    return (
      <Navbar expand="md">
        <Navbar.Brand as={Link} to="/">
          <img className="navbar__logo" src={Logo} alt="Tax Return Manager" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav container ">
          <Nav className="mr-auto container-fluid">
            <Button variant="outline-primary" className="mx-2 my-1" onClick={() => props.history.push("/")}>My Workflows</Button>
            <Button variant="outline-primary" className="mx-2 my-1" onClick={() => props.history.push("/workflows")}>All Outstanding Workflows</Button>
            <Button variant="outline-primary" className="mx-2 my-1" onClick={() => props.history.push("/workflows/completed")}>All Completed Workflows</Button>
            <Button variant="outline-primary" className="mx-2 my-1" onClick={() => props.history.push("/users")}>Users</Button>
            <Button variant="outline-primary" className="mx-2 my-1" onClick={() => props.history.push("/companies")}>Companies</Button>
            <Button variant="outline-primary" className="mx-2 my-1 ml-md-auto" onClick={() => props.history.push("/logout")}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
