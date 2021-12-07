import React from 'react'
import {Card} from "react-bootstrap"
import { Link} from "react-router-dom"

    const Contacts = ({ contacts }) => {
      return (
        <div>
          <center><h1>Notelist</h1></center>
          {contacts.map((contact) => (
            <Card>
              <Card.Header>
              <Card.Title>{contact.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Title>{contact.email}</Card.Title>
         
                <Card.Text>{contact.company.catchPhrase}</Card.Text>
                <Link to='/detailData' state={{detail: contact}} className="btn btn-primary w-100 mt-3">Ansehen</Link>
              </Card.Body>
            </Card>
          ))} 
        <Link to="/" className="btn btn-primary w-100 mt-3">
        Zurück
      </Link>
        </div>
        
      
      )
    };

export default Contacts