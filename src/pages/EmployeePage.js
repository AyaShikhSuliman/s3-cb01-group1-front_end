import React, { useState,useEffect } from 'react'
import TokenManager from "../apis/TokenManager";
import { useNavigate } from 'react-router-dom';
import {Container,Row,Col,Form,Button,Alert,Table  } from "react-bootstrap";
import {FaEdit,FaTrashAlt,FaCheck} from "react-icons/fa"
import {EmployeeAPI} from '../apis/EmployeeAPI'
import _isEqual from 'lodash/isEqual';
const EmployeePage = () => {

    const navigate = useNavigate()

    const[employeeName,setEmployeeName]=useState()
    const[emplsFound,setEmplsFound]=useState([])


    const fetchEmployees=()=>{
        EmployeeAPI.searchEmployee(employeeName)
        .then(response => setEmplsFound(response.data.employees))
    }
    useEffect(()=>{
        if(employeeName !=='')
        {
            fetchEmployees()
        }
        else{
            setEmplsFound([])
        }
    },[employeeName])


    /*handle delete */
function handleDelete(id) {
    EmployeeAPI.delete(id)
      .then(function (response) {
        console.log(response);
      })
      const updatedEmployees = emplsFound.filter(employee => employee.id !== id)
      setEmplsFound(updatedEmployees)

}

    function handleUpdate(updatedEmployee){
        EmployeeAPI.updateEmployee(updatedEmployee)
          .then(function (response) {
            console.log(response);
          })
    }

    const [editModal, setEditModal] = useState(null)
    const [editEmployee, setEditEmployee] = useState({})
    const [editEmployeeChecker, setEditEmployeeChecker] = useState({})


    function handleUpdateFake(updatedEmployee) {
        const updatedEmployees = emplsFound.map((employee) => {
          if (employee.id === updatedEmployee.id) {
            return updatedEmployee;
          } else {
            return employee;
          }
        });
        setEmplsFound([...updatedEmployees]);
      }

    /*handle edit */
function handleEditClick(employee) {
      if(editModal === employee.id)
      {
        setEditModal(null) 
        {if(!_isEqual(editEmployee, editEmployeeChecker)){
          handleUpdate(editEmployee)           
          handleUpdateFake(editEmployee)     
        }}
      }
      else
      {
        setEditModal(employee.id)
        setEditEmployee(employee);
        setEditEmployeeChecker(employee)
      } 
  }

  return (
    <div className='employee-page'>
     
      {TokenManager.getToken()
        ?
        <Container>
            <Row className='d-flex justify-content-center'>

            <Col lg={10} className='mt-4'>
                <Alert variant="success">
                        To manage an employee, start by searching the employee you want to view
                </Alert>
            </Col>

            </Row>
            <Row className='d-flex justify-content-center'>

                <Col lg={2}></Col>
                <Col lg={7} className='mt-4'>
                    <div className='search-input'>
                        <Form.Control
                            type="text"
                            id="inputSearch"
                            placeholder='search by name'
                            value={employeeName}
                            onChange={(e)=>setEmployeeName(e.target.value)}
                        />
                    </div>
                </Col>
                <Col lg={3} className='mt-3'>
                    <div >
                    <Button variant="info" size="lg" className='text-light'>
                        Add 
                    </Button>{' '}
                    <Button variant="info" size="lg"  className='text-light'>
                        Import
                    </Button>
                    </div>
                </Col>

                </Row>
                <Row>
                    <Col className='mt-5'>
                    <Table bordered>
                        <thead>
                            <tr className='bg-light'>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emplsFound.length > 0 ? (
                                emplsFound.map((employee,ind) => {
                                
                                    return(
                                        <>
                                            {editModal === employee.id
                                            ?
                                            <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>
                                            <Form.Control type="text" 
                                                value={editEmployee.name} 
                                                onChange={(e)=>{setEditEmployee({...editEmployee,name:e.target.value})}}/>
                                            </td>
                                            <td>
                                            <Form.Control type="text" 
                                                value={editEmployee.emailAddress} 
                                                onChange={(e)=>{setEditEmployee({...editEmployee,emailAddress:e.target.value})}}/>
                                            </td>
                                            <td>{employee.department.name}</td>
                                            <td>
                                            <Button variant="secondary" size="sm" onClick={(e)=> handleEditClick(employee)} active >
                                                 <FaCheck/>
                                            </Button>{' '}
                                            </td>
                                             </tr>
                                            :
                                            <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.emailAddress}</td>
                                            <td>{employee.department.name}</td>
                                            <td>
                                            <Button variant="secondary" size="sm" onClick={(e)=> handleEditClick(employee)} active >
                                              <FaEdit/>
                                            </Button>{' '}
                                            <Button variant="danger" size="sm" onClick={(e)=>handleDelete(employee.id)} active>
                                               <FaTrashAlt/>
                                            </Button>
                                            </td>
                                        </tr>
                                            }
                                        </>
                                    )
                                }
                                
                                )
                            ) : (
                                <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                            )}
                            </tbody>

                        </Table>
                    </Col>
                </Row>
        </Container>
        :navigate('/login')
      }
    </div>
  )
}

export default EmployeePage
