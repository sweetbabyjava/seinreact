import Contacts from './contacts.js';
import axios from "axios";
import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Tabs, Tab, Alert} from "react-bootstrap"

export default function Data() {
  const [notes, setNotes] = useState()
  const [sharedNotes, setSharedNotes] = useState()
  const { currentToken } = useAuth()

  useEffect(() => {


    //console.log(headers)
    axios.get('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes', {
      headers: {
        Authorization: 'Bearer ' + currentToken
      }
    }).then((response) => {
      setNotes(response.data)
    }).catch(console.log)

    axios.get('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/shared', {
      headers: {
        Authorization: 'Bearer ' + currentToken
      }
    }).then((response) => {
      setSharedNotes(response.data)
    }).catch(console.log)

  
  }, [currentToken])


  

  return (
    <><center><h1 className="text-white bg-dark mt-2">Notizen</h1></center>
    <Tabs variant="tabs" fill defaultActiveKey="mynotes" id="uncontrolled-tab-example" className="mb-0 text-white btn-dark rounded-5">
      
  <Tab eventKey="mynotes" title="Meine Notizen" className="text-white rounded-0">
  {notes && <Contacts notes={notes}></Contacts>}
  </Tab>
  <Tab eventKey="sharedwith" title="Mit dir geteilt" className="text-white  ">
  {sharedNotes ? 
  <Contacts notes={sharedNotes}></Contacts> :
  <Alert className="mt-2 mb-0 text-center" variant="primary">Es wurden noch keine Notizen geteilt.</Alert>}
  }  
  </Tab>
  <Tab eventKey="sharedby" title="Geteilt mit" className="text-white  ">
  <Alert className="mt-2 mb-0 text-center" variant="primary">Sie haben noch keine Notizen geteilt.</Alert>}
  </Tab>
  
</Tabs>
        
    </>



  )

}


