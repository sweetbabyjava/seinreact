import Contacts from './contacts.js';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Tabs, Tab, Stack} from "react-bootstrap"

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
    <><center><h1 className="text-white bg-dark">Notizen</h1></center>
    <Tabs variant="tabs" fill defaultActiveKey="mynotes" id="uncontrolled-tab-example" className="mb-3 text-white btn-dark">
      
  <Tab eventKey="mynotes" title="Meine Notizen" className="text-white ">
  {contact && <Contacts contacts={contact}></Contacts>}
  </Tab>
  <Tab eventKey="sharedwith" title="Mit dir geteilt" className="text-white  ">
    
  </Tab>
  <Tab eventKey="sharedby" title="Geteilt mit" className="text-white  ">
    
  </Tab>
  
</Tabs>
        
    </>



  )

}


