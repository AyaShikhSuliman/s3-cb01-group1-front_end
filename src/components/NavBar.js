import React from "react";
import { FiLogOut } from "react-icons/fi"
import {FaCalendarAlt} from "react-icons/fa"
import { RiUserSettingsLine } from "react-icons/ri";
import TokenManager from "../apis/TokenManager";
import {Navbar,Container,Nav,Button,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useNavigate } from 'react-router-dom';
function NavBar() {
  const navigate = useNavigate();
  const handleLogout= ()=>{
    TokenManager.clearToken()
    navigate('/login')
  }
  return (
    <>

    <Navbar   expand="lg" className={styles.nav}>
      <Container fluid className="p-0">
      <Navbar.Brand href="/" className="py-0">
            <img
              src="/assets/logos/sioux-logo.png"
              width="300"
              height="130"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"           
            navbarScroll
          >
            <Nav.Link href="/" className={styles.calendar}><FaCalendarAlt className={styles.calendarIcon}/> Calendar</Nav.Link>
            <Nav.Link href="/EmployeePage" className={styles.calendar}><RiUserSettingsLine className={styles.calendarIcon}/> Employees</Nav.Link>
          </Nav>
            <Button variant="dark" size="lg" className={styles.btnLogout} onClick={handleLogout}> <FiLogOut/> Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      

    </>
  );
}

export default NavBar;
