import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage.js';
import AppointmentPage from './pages/AppointmentPage.js';
import NavBar from './components/NavBar';
import Login from './pages/Login.js';
import EmployeePage from './pages/EmployeePage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/EmployeePage" element={<EmployeePage />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
