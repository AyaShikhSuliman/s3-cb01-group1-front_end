import React, {useEffect,useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import {Toast,ToastContainer  } from 'react-bootstrap';
import { AppointmentAPI } from "../apis/AppointmentAPI";
import _isEqual from 'lodash/isEqual';
import './Calendar.css'
import AppointmentModal from './AppointmentModal';
import moment from 'moment';

const Calendar = (props) => {
  console.log("props")
  const [show, setShow] = useState(false);

const customHeader = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
};


const [AllAppointments, setAllAppointments] =useState()


const getAllAppointments = (arg)=>{

  AppointmentAPI.getAllByDates(moment(arg.start).format('YYYY-MM-DD'),moment(arg.end).format('YYYY-MM-DD'))
  .then(function (response) {
        setAllAppointments(response.data.appointments)
      })
}


useEffect(()=>{
  if(props.appointmentsByEmp?.length > 0){
    console.log("inside if ",props?.appointmentsByEmp )
    setAllAppointments(props?.appointmentsByEmp)
  }
  else{
    //getAllAppointments()
  }
  
},[props.appointmentsByEmp])

const [EmpAppointments, setEmpAppointments] =useState([])


const [appointmentInfo, setAppointmentInfo] = useState([])

useEffect(() => {
  console.log('EmpAppointments:', EmpAppointments);
  if(EmpAppointments && EmpAppointments?.length > 0){
    const appointment =  
      EmpAppointments?.map(appointments=>({
        id:appointments?.id,
        startTime:appointments?.start_time,
        endTime:appointments?.end_time,
        date:appointments?.date,
        employee:{id:appointments?.employee?.id,name:appointments?.employee?.name,email:appointments?.employee?.emailAddress},
        department:appointments?.department?.id,
        guestId: appointments?.guest?.id,
        guestName:appointments?.guest?.name,
        guestEmail:appointments?.guest?.email_address,
        guestPhone:appointments?.guest?.phone_number,
        guestLicense:appointments?.guest?.license
      }))
    
       console.log("appointment",appointment)
       setAppointmentInfo(appointment);
  }
}, [EmpAppointments]);


const [showModal, setShowModal] = useState(false)
useEffect(()=>{
  if(appointmentInfo && appointmentInfo?.length > 0){
    setShowModal(true);
  }
},[appointmentInfo])


const [uniqueAppointments, setUniqueAppointments] = useState([]);

useEffect(() => {
  const uniqueAppointments = [];
  const uniqueAppointmentsKeys = new Set();

  AllAppointments?.forEach((appointment) => {
    const key = `${ moment(appointment.date).format('YYYY-MM-DD')}_${appointment.employee.id}`;
    if (!uniqueAppointmentsKeys.has(key)) {
      uniqueAppointmentsKeys.add(key);
      uniqueAppointments.push({
        title: appointment.employee.name,
        date: appointment.date,
        backgroundColor: 'green',
        employee_id: appointment.employee.id,
        department_id: appointment.employee.department?.id,
        startTime:appointment?.start_time,
        endTime:appointment?.end_time
      });
    }
  });

  setUniqueAppointments(uniqueAppointments);
  console.log(uniqueAppointments)
}, [AllAppointments]);

const handleEventClick = (info) => {
    AppointmentAPI.getAllAppointmentsByEmpIdAndDate( moment(info.event.start).format('YYYY-MM-DD'),info.event.extendedProps?.employee_id).then(function (response) {
      setEmpAppointments(response.data.appointments)
    }); 
};

const [currentView, setCurrentView] = useState('dayGridMonth');

const handleDatesSet = (arg) => {
  //console.log('Current view dates: ', moment(arg.start).format('YYYY-MM-DD'), ' - ', moment(arg.end).format('YYYY-MM-DD'));
  setCurrentView(arg.view.type);
  getAllAppointments(arg)
};


console.log("currentView",currentView)
  return (
    <div className='p-2'>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      datesSet={handleDatesSet}
      events={
        currentView == 'dayGridMonth'
          ? uniqueAppointments?.map((appointment) => ({
              title: appointment?.title,
              date: appointment?.date,
              backgroundColor: "green",
              employee_id: appointment?.employee_id,
              department_id: appointment?.department_id,
            }))
          : uniqueAppointments?.map((appointment) => ({
              title: appointment?.title,
              date: appointment?.date,
              backgroundColor: "green",
              employee_id: appointment?.employee_id,
              department_id: appointment?.department_id,
              start: moment(
                appointment?.date + " " + appointment?.startTime,
                "YYYY-MM-DD HH:mm"
              ).format(),
              end: moment(
                appointment?.date + " " + appointment?.endTime,
                "YYYY-MM-DD HH:mm"
              ).format(),
            }))
      }
      headerToolbar={customHeader} 
      dayHeaderFormat={{ weekday: 'short' }} 
      dayCellContent={(e) => ( 
        <div className="fc-daygrid-day-number">
          {e.dayNumberText}
        </div>
      )}
      eventClick={handleEventClick}
    />

    <AppointmentModal 
    appointmentInfo={appointmentInfo} 
    showModal={showModal} 
    setShowModal={setShowModal} 
    setShow={setShow}
    />


      <ToastContainer position='bottom-end' className="p-3">
        <Toast className="d-inline-block m-1"
          bg={"success"} onClose={() => setShow(false)} show={show} delay={3000} animation={true} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">update appointment</strong>
            <small>1 second ago</small>
          </Toast.Header>
          <Toast.Body className='light'>Woohoo, appointment is updated successfully!</Toast.Body>
        </Toast>
        </ToastContainer>

  </div>
  )
}

export default Calendar
