import React from 'react'
import { useState, useEffect,useRef } from 'react';
import {Container,Row,Col,Card,ListGroup,Form,Dropdown} from "react-bootstrap";
import styles from "./FilterDropdown.module.css";

const FilterDropdown = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState("");
  
    const InputRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (InputRef.current && !InputRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    }, [InputRef]);
  
    const handleItemClick = (item) => {
      {props?.getAllEmployees && props?.getAllEmployees(item?.name) } 
      {props?.getAllApppintmentsByEmp && props?.getAllApppintmentsByEmp(item?.id)} 
      console.log(item?.id)
      setSelectedItem(item?.name);
      setInputValue(item?.name);
      setIsOpen(false);
    };
  
    const handleInputChange = (e) => {
      {props?.getAllApppintmentsByEmp && props?.findEmployee(e.target.value) } 
      {props?.setClientInfo && props?.setClientInfo(e.target.value)}
      setInputValue(e.target.value);
      setIsOpen(Boolean(e.target.value));
    };
  
    const handleInputClick = () => {
      {props?.listItems?.length > 0 && setIsOpen(true)}      
    };

  return (
    <>
        <h6>{props?.header}</h6>                          
        <Dropdown show={isOpen} ref={InputRef}>
            <Form.Group controlId={props?.header} >
              {props?.header ==="Client" ?
                      <Form.Control
                          type="text"
                          className={styles.formControl}
                          placeholder={''}
                          value={inputValue}
                          onChange={handleInputChange}
                          //onClick={handleInputClick}
                      /> 
                      
                      :
                      <Form.Control
                      type="text"
                      className={styles.formControl}
                      placeholder={`select ${props?.placeholder}`}
                      value={inputValue}
                      onChange={handleInputChange}
                      onClick={handleInputClick}
                  />
            }

            </Form.Group>

            <Dropdown.Menu>
              {props?.listItems?.map((item) => (
                <Dropdown.Item key={item?.id} onClick={() => handleItemClick(item)} className={styles.dropdownItem}>
                 {item?.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>

        </Dropdown>
    </>
  )
}

export default FilterDropdown
