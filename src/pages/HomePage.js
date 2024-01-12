import React from "react";
import { useState, useEffect } from 'react';
import {Container,Row,Col,Card,ListGroup,Form,Button,OverlayTrigger,Popover } from "react-bootstrap";
import DepartmentDropdown from '../components/FilterDropdown'
import EmployeeDropdown from '../components/FilterDropdown'
import GuestDropdown from '../components/FilterDropdown'
import Calendar from '../components/Calendar'
import styles from "./HomePage.module.css";
import { FiInfo } from "react-icons/fi"
import { DepartmentAPI } from "../apis/DepartmentAPI";
import { EmployeeAPI } from "../apis/EmployeeAPI";
import { AppointmentAPI } from "../apis/AppointmentAPI";
import TokenManager from "../apis/TokenManager";
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();

  const [departments,setDepartments]=useState([])
  
  useEffect(()=>{
    DepartmentAPI.getAllDep().then(function (response) {
      setDepartments(response.data.departments)
    }); 
    console.log("departments",departments)
  },[])
  

  const [employees,setEmployees]=useState([])
  
  const getAllEmployees = (depName)=>{
    EmployeeAPI.getEmployeesByDepName(depName).then(function (response) {
      setEmployees(response.data.employees)
    }); 
    console.log("departments",departments)
  }

  const findEmployee = (input)=>{
    EmployeeAPI.searchEmployee(input).then(function (response) {
      setEmployees(response.data.employees)
    }); 
    console.log("hi fron find emp")
  }

  const [appointmentsByEmp,setAppointmentsByEmp]=useState([])
  
  const getAllApppintmentsByEmp = (id)=>{
    AppointmentAPI.get(id).then(function (response) {
      setAppointmentsByEmp(response.data.appointments)
      console.log("from home page",response.data.appointments)
    });     
  }

  const[clientInfo,setClientInfo]=useState()
  const getAllApppintmentsByGuest = ()=>{
    const numbers= [0,1,2,3,4,5,67,8,9]
    const containsNumber = numbers.some(number => clientInfo?.includes(number.toString()));
    console.log("inputContainsNumber",containsNumber)
    console.log(clientInfo)
    if(containsNumber){
      AppointmentAPI.getAllAppointmentsByLicense(clientInfo).then(function (response) {
        setAppointmentsByEmp(response.data.appointments)
      }); 
    }
    else{
      AppointmentAPI.getAllAppointmentsByGuestName(clientInfo).then(function (response) {
         setAppointmentsByEmp(response.data.appointments)
        console.log("hi from guest name",response.data.appointments)
      }); 
      
    }

  }
  
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Client's details</Popover.Header>
      <Popover.Body>
        Type the license plate or guest name and click search.
      </Popover.Body>
    </Popover>)
  return (

    <>
        {TokenManager.getToken()
        ?
        <Container className={styles.calendarContainer}>
        <Row >
            <Col className={styles.cardHolder} >
                <div className={styles.calendarCard}>
                  <Row className={styles.h100}>
                    <Col lg={3}>
                    <Card className={styles.h100} style={{borderRadius:0}}>
                      <Card.Header className={styles.cardHeader}>Filter</Card.Header>
                        <ListGroup variant="flush">
                          <ListGroup.Item className={styles.listGroupItem}>
                          <Form.Check 
                            type="switch"           
                            checked={isChecked} 
                            onChange={handleCheckboxChange}  
                            label="Available employees"
                            className="employeesCheckbox"
                            />                          
                          </ListGroup.Item>
                          <ListGroup.Item className={styles.listGroupItem}>
                                  <DepartmentDropdown 
                                    listItems={departments} 
                                    placeholder="department" 
                                    header="Department" 
                                    getAllEmployees={getAllEmployees} 
                                  />
                            </ListGroup.Item>
                          <ListGroup.Item className={styles.listGroupItem}>
                                  <EmployeeDropdown 
                                    listItems={employees} 
                                    placeholder="employee" 
                                    header="Employee" 
                                    getAllApppintmentsByEmp={getAllApppintmentsByEmp}
                                    findEmployee={findEmployee}
                                  />
                            </ListGroup.Item>
                            <hr/>
                          <ListGroup.Item className={styles.listGroupItem}>
                                  <GuestDropdown 
                                    listItems={[]} 
                                    placeholder="license plate, name, etc " 
                                    header="Client"
                                    setClientInfo={setClientInfo}
                                  />
                                  <OverlayTrigger trigger="click" placement="right" overlay={popover}>                                   
                                    <div className={styles.infoIcon}><FiInfo /></div>
                                  </OverlayTrigger>
                            </ListGroup.Item>
                            <ListGroup.Item className={styles.listGroupItem}>
                            <div className=" ">
                              <Button onClick={()=>getAllApppintmentsByGuest()} variant="danger" size="md" className={styles.btnSearch}>
                                Search
                              </Button>
                            </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    </Col>
                    <Col lg={9} className="m-auto">
                      <Calendar appointmentsByEmp={appointmentsByEmp}/>
                    </Col>
                  </Row>
                </div>
            </Col>
        </Row>
      </Container>
        :
        navigate('/login')
        }

    </>
  );
}

export default HomePage;
