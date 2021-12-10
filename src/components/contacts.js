import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Contacts = ({ notes }) => {

  function dateDiff(date1, date2) {
    return (Math.ceil((date2 - date1) / 8.64e7))*-1;
  }
  return (
    <div>
      
      {notes.map((note) => (
        <Card key={note.id} className="mt-2 text-white bg-dark rounded-0">
          <Card.Header>
            <Card.Title>{note.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text className="pre-wrap">{note.text}</Card.Text>
            
          </Card.Body>
          <Card.Footer className="text-muted"> {dateDiff(new Date(),new Date(note.creationDate)) === 0 ? "Heute" : "Vor " + dateDiff(new Date(),new Date(note.creationDate)) + " Tagen"}
          <Link to='/Contact'
              state={{ detail: note, formTitle: "Notiz bearbeiten", notEditable: false }}
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