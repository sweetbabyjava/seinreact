import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Contacts = ({ contacts }) => {

  function dateDiff(date1, date2) {
    return (Math.ceil((date2 - date1) / 8.64e7))*-1;
  }
  return (
    <div>
      
      {contacts.map((contact) => (
        <Card key={contact.id} className="mt-5 text-white bg-dark rounded-0">
          <Card.Header>
            <Card.Title>{contact.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text className="pre-wrap">{contact.text}</Card.Text>
            
          </Card.Body>
          <Card.Footer className="text-muted"> {dateDiff(new Date(),new Date(contact.creationDate)) === 0 ? "Heute" : "Vor " + dateDiff(new Date(),new Date(contact.creationDate)) + " Tagen"}
          <Link to='/Contact'
              state={{ detail: contact, formTitle: "Notiz bearbeiten", notEditable: false }}
              className="btn btn-light w-100 mt-3">Notiz bearbeiten
          </Link>
          </Card.Footer>
          
        </Card>
      ))}
      <Link to='/Contact'
        state={{ detail: { title: "", text: "" }, formTitle: "Notiz Anlegen", notEditable: true }}
        className="btn btn-dark w-100 mt-3">Neue Notiz anlegen
      </Link>

      <Link to="/"
        className="btn btn-dark w-100 mt-3">
        Zurück
      </Link>
    </div>


  )
};

export default Contacts