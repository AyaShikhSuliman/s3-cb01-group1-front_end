import React, { useState } from 'react'
import {Container,Row,Col,Card,Form,Button } from "react-bootstrap";
import AuthAPI from '../apis/AuthApi';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const Login = () => {

  const navigate = useNavigate();

  const [username,setUserName]=useState()
  const [password,setPassword]=useState()

  const handleLogin= async(event)=>{
    event.preventDefault()
    const { success, data, error } = await AuthAPI.login(username, password)
    if(success)
    {
      navigate('/');
    }
    else{

    }
  }

  return (
    <div className='login'>
      <Container>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col lg={8}>
          <Card className='login-card'>
            <Row>
              <Col lg={6} md={12} className='d-flex  px-0 '>             
                <Card.Img  src="/assets/logos/sioux-logo.png" />             
              </Col>
              <Col lg={6} md={12} className='px-0'>
              <Card.Body>
                  {/* <Card.Title>Login</Card.Title> */}
                  <Form className='login-form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" value={username} onChange={(e)=>setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="danger" type="submit" onClick={handleLogin}>
                      Login
                    </Button>
                  </Form>
              </Card.Body>
              </Col>
            </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login