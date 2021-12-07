import Contacts from './contacts.js';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function Data2() {
  const [contact, setContact] = useState("")
  const { currentToken } = useAuth()
  
  useEffect(() => {

  
    //console.log(headers)
    axios.get('https://rest-api-4haunaqgaq-ew.a.run.app/notes',{
      headers: {
        Authoriation: 'Bearer ' + currentToken
      }}).then((response) => {
      setContact(response.data)
      }).catch(console.log)}, [currentToken])

  return (
  
    contact && <Contacts contact={contact}/> 



  )
  
}


