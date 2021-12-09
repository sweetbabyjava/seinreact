import Contacts from './contacts.js';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function Data() {
  const [contact, setContact] = useState("")
  const { currentToken } = useAuth()

  useEffect(() => {


    //console.log(headers)
    axios.get('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes', {
      headers: {
        Authorization: 'Bearer ' + currentToken
      }
    }).then((response) => {
      setContact(response.data)
    }).catch(console.log)
  }, [currentToken])

  return (

    contact && <Contacts contacts={contact} />



  )

}


