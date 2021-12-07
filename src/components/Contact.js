import { useLocation, Link} from "react-router-dom"
import React, { useRef, useState} from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

export default function Contact() {
  const nameRef = useRef()
  const textRef = useRef()
  const location = useLocation()
  const { detail } = location.state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [contact, setContact] = useState(detail)
  const { currentToken } = useAuth()
  const url = 'https://jsonplaceholder.typicode.com/users'
  
 

  function handleSubmit(e) {
    e.preventDefault()
    
    
    setLoading(true)
    setError("")

    axios.get('http://localhost:8080/private/user-details',{
      headers: {
        Authorization: 'Bearer ' + currentToken
      }}).then((response) => {
      setContact(response.data)
      setLoading(false)
      })
    /* axios.get('https://jsonplaceholder.typicode.com/users',{
      headers: {
        Authorization: 'Bearer ' + currentToken
      }}).then((response) => {
      setLoading(false)
      setContact(response.data)
      }) */
  }
  function addNote(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

  }
  function translateNote(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

  }
  function deleteNote(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

  }

      return (
        <div>
          <center><h1>Note</h1></center>
          
            <Card>
              <Card.Header>
              <Card.Title>{contact.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>{contact.email}</Card.Subtitle>
                <Card.Text>{contact.email}</Card.Text>
                
              </Card.Body>
            </Card>
            <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Note bearbeiten</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="displayName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                defaultValue={detail.name}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea" rows={8} ref={textRef} defaultValue={detail.company.catchPhrase}/>
            </Form.Group>
            
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Aktualisieren
            </Button>
            <Button 
              onClick={addNote}
              disabled={loading} 
              variant="success" 
              className="w-100 mt-2">
                Hinzufügen
            </Button>
            <Button 
              onClick={translateNote}
              disabled={loading} 
              variant="warning" 
              className="w-100 mt-2">
              Übersetzen
            </Button>
            <Button 
              onClick={deleteNote}
              disabled={loading} 
              variant="danger" 
              className="w-100 mt-2">
              Löschen
            </Button>
          </Form>
        </Card.Body>
      </Card>
            <Link to="/data" className="btn btn-primary w-100 mt-3">
              Zurück
            </Link>
        
        </div>
        
      
      )
    };