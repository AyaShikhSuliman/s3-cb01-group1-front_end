import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AppointmentAPI } from "../apis/AppointmentAPI";

function AppointmentPage() {
  const [appointments, setAppointments] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [activeAppointment, setActiveAppointment] = useState();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [license, setLicense] = useState("");

  const [startTimeEdit, setStartTimeEdit] = useState("");
  const [endTimeEdit, setEndTimeEdit] = useState("");
  const [employeeNameEdit, setEmployeeNameEdit] = useState("");
  const [guestNameEdit, setGuestNameEdit] = useState("");
  const [licenseEdit, setLicenseEdit] = useState("");

  useEffect(() => {
    AppointmentAPI.get().then(function (response) {
      console.log(response);
      setAppointments(response.data.appointments);
    });
  }, []);

  function editAppointment(selectedAppointment) {
    // setStartTimeEdit(selectedAppointment.startTime);
    setActiveAppointment(selectedAppointment);
    // if (startTimeEdit.length === 0){
    //   // console.log(activeAppointment.startTimeEdit)
    //   setStartTimeEdit(activeAppointment.startTime)

    // }
    handleShowEdit();
    console.log(selectedAppointment);
  }

  function handleDelete(id) {
    AppointmentAPI.delete(id)
      .then(function (response) {
        console.log(response);
      })
      .then(() => {
        setAppointments((appointments) => {
          return appointments.filter(
            (appointment) => appointment !== appointment.id
          );
        });
        window.location.reload(false);
      });
  }

  function handleEdit(idEdit) {
    // var startTimeEditValue = activeAppointment.startTimeEdit;
    // var endTimeEdit  = "2";
    // var employeeNameEdit  = "";
    // var guestNameEdit = "";
    // var licenseEdit = "";

    // if (startTimeEdit.length === 0) {
    //   console.log(activeAppointment.startTimeEdit)
    //   setStartTimeEdit(activeAppointment.startTimeEdit);
    //   startTimeEdit = "w";
    // }
    // console.log(endTimeEdit);

    AppointmentAPI.update(
      idEdit,
      startTimeEdit,
      endTimeEdit,
      employeeNameEdit,
      guestNameEdit,
      licenseEdit
    )
      .then(function (response) {
        console.log(response);
      })
      .then(() => {
        // setAppointments((appointments) => {
        //   return appointments.filter(
        //     (appointment) => appointment !== appointment.id
        //   );
        // });
        window.location.reload(false);
      });
  }

  function handleCreate() {
    AppointmentAPI.create(
      startTime,
      endTime,
      employeeName,
      guestName,
      license
    ).then(function (response) {
      console.log(response);
      window.location.reload(false);
    });
  }

  if (!appointments) return <div>No Appointments found</div>;

  const listAppointment = appointments.map((appointment) => (
    // TODO: Make this into a component
    <li
      key={appointment.id}
      style={{ border: "#2c8cab", borderStyle: "solid", listStyle: "none" }}
    >
      <div>
        ID: {appointment.id} | StartTime: {appointment.start_time} | EndTime{" "}
        {appointment.end_time} | Date {appointment.date} || Employee-name:{" "}
        {appointment.employee.name} || Guest-name: {appointment.guest.name} ||
        Department-name: {appointment.department.name} ||
      </div>
      <Button variant="secondary" onClick={(e) => editAppointment(appointment)}>
        Edit Appointment
      </Button>
      <Button variant="primary" onClick={(e) => handleDelete(appointment.id)}>
        Delete Appointment
      </Button>
    </li>
  ));
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Appointment
      </Button>
      {/* Create Model */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Fill in this form
          <Form>
            <Form.Group className="mb-3" controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Start Time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter End Time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmployeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee name"
                value={employeeName}
                onChange={(e) => {
                  setEmployeeName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGuestName">
              <Form.Label>Guest Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Guest name"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLicense">
              <Form.Label>License</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter License"
                value={license}
                onChange={(e) => {
                  setLicense(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="secondary" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={handleCreate}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>Sioux</Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      {activeAppointment && (
        <>
          <Modal
            show={showEdit}
            onHide={handleCloseEdit}
            backdrop="static"
            animation={false}
            centered
            // currentAppointment={activeAppointment}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Edit this form
              <Form>
                {/* TODO: change placeholder text value to actual value */}
                <Form.Group className="mb-3" controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeAppointment.start_time}
                    value={startTimeEdit}
                    onChange={(e) => {
                      setStartTimeEdit(e.target.value);
                      // activeAppointment.start_time = (e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEndTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeAppointment.end_time}
                    value={endTimeEdit}
                    onChange={(e) => {
                      setEndTimeEdit(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeName">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeAppointment.employee.name}
                    value={employeeNameEdit}
                    onChange={(e) => {
                      setEmployeeNameEdit(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGuestName">
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeAppointment.guest.name}
                    value={guestNameEdit}
                    onChange={(e) => {
                      setGuestNameEdit(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLicense">
                  <Form.Label>License</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeAppointment.guest.license}
                    value={licenseEdit}
                    onChange={(e) => {
                      setLicenseEdit(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCloseEdit}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={(e) => handleEdit(activeAppointment.id)}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>Sioux</Modal.Footer>
          </Modal>
        </>
      )}

      <h1>appointment</h1>
      <ul>{listAppointment}</ul>
      <hr></hr>
    </div>
  );
}

export default AppointmentPage;
