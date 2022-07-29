import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import EditEmployee from '../EditEmployee/EditEmployee';
import ProtectedRoute from '../ProtctedRoute/ProtectedRoute';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {

  const [firstEmployee, setFirstEmployee] = useState(null);
  const [secondEmployee, setSecondEmployee] = useState(null);
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState({});
  const baseURL = 'http://localhost:5000';

  function assignEmployees(firstEmployeeToAssign, secondEmployeeToAssign) {

    setFirstEmployee(firstEmployeeToAssign);
    setSecondEmployee(secondEmployeeToAssign);
  }

  function updateEmployee(employee) {
    return fetch(`${baseURL}/update_employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setEmployeeToEdit(employee);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // define the employ that will be updated get it finally from db
  function assignEmployeeToUpdate(employee) {
    setEmployeeToEdit(employee);
    fetch(`${baseURL}/get_employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Email: employee.Email })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setEmployeeToEdit(data.employee);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // initilizing the employees list
  useEffect(() => {
    fetch(`${baseURL}/get_all_employees`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setEmployeesList(data.list_employees);
        }
      })
      .catch((err) => {
        console.log('still not');
        console.log(err);
      });
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <Main
              employeesList={employeesList}
              assignEmployees={assignEmployees}
              firstEmployee={firstEmployee}
              secondEmployee={secondEmployee}
              assignEmployeeToUpdate={assignEmployeeToUpdate}
            />
          } />
          <Route path="edit" element={
            <ProtectedRoute employeeToEdit={employeeToEdit}>
              <EditEmployee employeeToEdit={employeeToEdit} updateEmployee={updateEmployee} />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;



