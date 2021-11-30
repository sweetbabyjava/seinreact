import React from 'react'
import {Card} from "react-bootstrap"
import { Link} from "react-router-dom"

    const Contacts = ({ contacts }) => {
      return (
        <div>
          <center><h1>Kontaktliste</h1></center>
          {contacts.map((contact) => (
            <Card>
              <Card.Body>
                <Card.Title>{contact.name}</Card.Title>
                <Card.Subtitle>{contact.email}</Card.Subtitle>
                <Card.Text>{contact.company.catchPhrase}</Card.Text>
                <Link to={{ pathname: '/detailData', state: { detail: contact} }}>Ansehen</Link>
              </Card.Body>
            </Card>
          ))}
          <Card>
              <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Subtitle>Mitarbeiter</Card.Subtitle>
                <Card.Text>Mag Kekse und Einhörner</Card.Text>
              </Card.Body>
            </Card>
        <Link to="/" className="btn btn-primary w-100 mt-3">
        Zurück
      </Link>
        </div>
        
      
      )
    };

export default Contacts