import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, employeeToEdit }) {
  return employeeToEdit.Name ? children : <Navigate to="/" />;
}

export default ProtectedRoute;