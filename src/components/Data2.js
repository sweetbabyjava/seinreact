import Contact from './Contact.js';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function Data2() {
  const [contact, setContact] = useState("")
  const { currentToken } = useAuth()
  
  useEffect(() => {

  
    //console.log(headers)
    axios.get('http://localhost:8080/private/user-details',{
      headers: {
        Authorization: 'Bearer ' + currentToken
      }}).then((response) => {
      setContact(response.data)
      })}, [currentToken])

  return (
  
    contact && <Contact contact={contact}/> 



  )
  
}


