import React from 'react'
import {Card} from "react-bootstrap"
import { Link} from "react-router-dom"

    const Contact = ({ contact }) => {
      return (
        <div>
          <center><h1>Kontaktliste</h1></center>
          
            <Card>
              <Card.Body>
                <Card.Title>{contact.uid}</Card.Title>
                <Card.Subtitle>{contact.email}</Card.Subtitle>
                <Card.Text>{contact.issuer}</Card.Text>
                <Link to={{ pathname: '/ddData'}}>Ansehen</Link>
              </Card.Body>
            </Card>
        
        </div>
        
      
      )
    };

export default Contact