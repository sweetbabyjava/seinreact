import { useLocation, Link, useNavigate } from "react-router-dom"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

export default function Contact() {
  const titelRef = useRef()
  const textRef = useRef()
  const location = useLocation()
  const { detail, formTitle, notEditable } = location.state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { currentToken } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (detail.title !== titelRef.current.value || detail.text !== textRef.current.value) {
      setError("")
      const note = { id: detail.id, uid: detail.uid, title: titelRef.current.value, text: textRef.current.value }
      axios.put('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/update', note, {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      }).then((response) => {
        setLoading(false)
        navigate("/data")
      }).catch(setLoading(false))
    }
    else {
      setError("Keine Änderungen vorhanden.")
      setLoading(false)
    }
  }
  function addNote(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (titelRef.current.value !== "" || textRef.current.value !== "") {
      let note = { "title": titelRef.current.value, "text": textRef.current.value }
      axios.post('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/create', note, {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      }).then(() => {
        setLoading(false)
        navigate("/data")
      }).catch(() =>{
        setError(error.message);
        setLoading(false);
      })
    }
    else {
      setError("Keine Daten eingegeben")
      setLoading(false)
    }
    
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
    axios.delete('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/delete', { data: detail, headers: { Authorization: 'Bearer ' + currentToken } }
    )
      .then(() => {
        setLoading(false)
        navigate("/data")
      })
      .catch((error) =>{
        setLoading(false);
        setError(error.message)})
  }
  return (
    <div>
      <Card className="w-100 text-white bg-dark rounded-0">
        <Card.Header><center><h1>{formTitle}</h1></center></Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {!notEditable &&
              <Form.Group id="creationDate">
                <Form.Label>Datum</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(detail.creationDate))}
                />
              </Form.Group>
            }
            {!notEditable &&
              <Form.Group id="UID">
                <Form.Label>UID</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={detail.uid}
                />
              </Form.Group>
            }
            {!notEditable &&
              <Form.Group id="ID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={detail.id}
                />
              </Form.Group>
            }
            <Form.Group id="titel">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                type="text"
                ref={titelRef}
                required
                placeholder="Titel vergeben..."
                defaultValue={detail.title}
              />
            </Form.Group>

            <Form.Group id="text">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea"
                rows={8}
                ref={textRef}
                defaultValue={detail.text}
                required
                placeholder="Text eingeben..." />
            </Form.Group>
            {!notEditable &&
              <Button disabled={loading} className="w-100 mt-2 btn-light" type="submit">
                Aktualisieren
              </Button>
            }
            <Button
              onClick={addNote}
              disabled={loading}
              variant="light"
              className="w-100 mt-2">
              Hinzufügen
            </Button>
            <Button
              onClick={translateNote}
              disabled="1"
              variant="light"
              className="w-100 mt-2">
              Übersetzen
            </Button>
            {!notEditable &&
              <Button
                onClick={deleteNote}
                disabled={loading}
                variant="light"
                className="w-100 mt-2">
                Löschen
              </Button>
            }
          </Form>
        </Card.Body>
      </Card>
      <Link to="/data" className="btn btn-dark w-100 mt-3">
        Zurück
      </Link>
    </div>
  )
};