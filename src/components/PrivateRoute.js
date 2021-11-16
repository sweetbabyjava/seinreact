import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"



const PrivateRoute = () => {

  const { currentUser } = useAuth()
  
  const auth = currentUser; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute