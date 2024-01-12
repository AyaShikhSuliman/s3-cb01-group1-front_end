import React, {useEffect,useState} from 'react'
import { AppointmentAPI } from "../apis/AppointmentAPI";
import { Modal, Button,Table,Form  } from 'react-bootstrap';
import {FaEdit,FaTrashAlt,FaCheck} from "react-icons/fa"
import _isEqual from 'lodash/isEqual';
const AppointmentModal = (props) => {

const [showModal, setShowModal] = useState(false)

useEffect(()=>{
    setShowModal(props?.showModal)
},[props?.showModal])

const handleCloseModal = () =>  props.setShowModal(false);

const [appointmentInfo, setAppointmentInfo] = useState([])
useEffect(()=>{
    setAppointmentInfo(props?.appointmentInfo)
    console.log("new appointmentInfo",appointmentInfo)
},[props?.appointmentInfo])


const[change,setChange]=useState(false);
const saveObj = {
  startTime:'',
  endTime:'',
  date:'',
  employeeId:'',
  departmentId:'',
  guestName:'',
  guestEmail:'',
  guestPhone:'',
  guestLicense:''
}
const [saveAppointment, setSaveAppointment] =useState({})
useEffect(()=>{
  {_isEqual(saveObj, saveAppointment) && setChange(false)}
},[saveAppointment])

const [saveCheck, setSaveCheck] =useState(false)

function handleSave(){
    setSaveAppointment({
        ...saveAppointment,
        date: appointmentInfo[0].date,
        employeeId: appointmentInfo[0]?.employee.id,
        departmentId: appointmentInfo[0]?.department,
      });
      setSaveCheck(true)
}
useEffect(()=>{
    if(saveCheck){
        console.log("savedAppointment befor creating", saveAppointment)
        AppointmentAPI.create(saveAppointment)
        .then(function (response) {
          console.log(response);
        });
        setAppointmentInfo([...appointmentInfo, saveAppointment])
        setSaveCheck(false)
    }
},[saveCheck])


/*handle delete */
function handleDelete(id) {
    AppointmentAPI.delete(id)
      .then(function (response) {
        console.log(response);
      })
      const updatedAppointments = appointmentInfo.filter(appointment => appointment.id !== id)
      setAppointmentInfo(updatedAppointments)

}

function handleUpdate(updatedAppointment){
    AppointmentAPI.update(updatedAppointment)
      .then(function (response) {
        console.log(response);
      })
    
}

const [editModal, setEditModal] = useState(null)
const [editAppointment, setEditAppointment] = useState({})
const [editAppointmentChecker, setEditAppointmentChecker] = useState({})


function handleUpdateFake(updatedAppointment) {
    const updatedAppointments = appointmentInfo.map((appointment) => {
      if (appointment.id === updatedAppointment.id) {
        return updatedAppointment;
      } else {
        return appointment;
      }
    });
    setAppointmentInfo([...updatedAppointments]);
  }
/*handle edit */
function handleEditClick(info) {
    if (info && info.id) {
      if(editModal === info.id)
      {
        setEditModal(null) //togles between edit icon and check icon 
        setEditAppointment({...editAppointment, id:info.id,guestId:info.guestId})
        {if(!_isEqual(editAppointment, editAppointmentChecker)){
          handleUpdate(editAppointment)           
          handleUpdateFake(editAppointment)
          props.setShow(true)
        }}
      }
      else
      {
        setEditModal(info.id)
        setEditAppointment(info);
        setEditAppointmentChecker(info)
      } 
    } 
  }


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{appointmentInfo[0]?.date}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table responsive>
                <thead>
                <tr>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone</th>
                    <th>License</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  {appointmentInfo?.map((info,ind)=>{

                    return(
                      <>                                            
                    {editModal === info?.id
                    ?                   
                    <>                                     
                    <tr key={ind}>
                      <td><Form.Control type="time" 
                        value={editAppointment.startTime} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,startTime:e.target.value})}}
                        />
                      </td>
                      <td><Form.Control type="time" 
                        value={editAppointment.endTime} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,endTime:e.target.value})}}
                        
                        /></td>
                      <td>
                      <Form.Control type="text" 
                        value={editAppointment.guestName} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,guestName:e.target.value})}}/>
                      </td>
                      <td>
                      <Form.Control type="text" 
                        value={editAppointment.guestEmail} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,guestEmail:e.target.value})}}/>
                      </td>
                      <td>
                      <Form.Control type="text" 
                        value={editAppointment.guestPhone} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,guestPhone:e.target.value})}}/>
                      </td>
                      <td>
                      <Form.Control type="text" 
                        value={editAppointment.guestLicense} 
                        onChange={(e)=>{setEditAppointment({...editAppointment,guestLicense:e.target.value})}}/>
                      </td>
                      <td>
                        <div>
                        <Button variant="success" size="sm" onClick={(e)=> handleEditClick(info)}>
                          <FaCheck/>
                        </Button>
                        </div>
                      </td>
                    </tr>
                    </>
                    :
                    <tr key={ind}>
                      <td>{info.startTime}</td>
                      <td>{info.endTime}</td>
                      <td>{info.guestName}</td>
                      <td>{info.guestEmail}</td>
                      <td>{info.guestPhone}</td>
                      <td>{info.guestLicense}</td>
                      <td>
                        <div>
                        <Button variant="success" size="sm" onClick={(e)=> handleEditClick(info)}>
                          <FaEdit/>
                        </Button>{' '}
                        <Button variant="danger" size="sm" onClick={(e) => handleDelete(info.id)}>
                          <FaTrashAlt/>
                        </Button>
                        </div>
                      </td>
                  </tr>
                  }
                  
                  </>
                  
                    )

                  })}
                  <tr className='bb-light'>
                      <td><Form.Control type="time" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,startTime:e.target.value})}}/></td>
                      <td><Form.Control type="time" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,endTime:e.target.value})}}/></td>
                      <td><Form.Control type="text" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,guestName:e.target.value})}}/></td>
                      <td><Form.Control type="text" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,guestEmail:e.target.value})}}/></td>
                      <td><Form.Control type="text" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,guestPhone:e.target.value})}}/></td>
                      <td><Form.Control type="text" onChange={(e)=>{setChange(true);setSaveAppointment({...saveAppointment,guestLicense:e.target.value})}}/></td>
                      <td><Form.Control type="text" className='v-hidden'/></td>
                      <td>

                      </td>
                  </tr>
                </tbody>
            </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
          {change &&
          <Button variant="dark" onClick={handleSave}>
            Save
          </Button>
          }
        </Modal.Footer>
      </Modal>
  )
}

export default AppointmentModal