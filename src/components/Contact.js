import { useLocation, Link, useNavigate } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

export default function Contact() {
  const titelRef = useRef()
  const textRef = useRef()
  const languageRef = useRef()
  const location = useLocation()
  const { detail, formTitle, notEditable } = location.state
  const [note, setNote] = useState(detail)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { currentToken } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (note.title !== titelRef.current.value || note.text !== textRef.current.value) {
      setError("")
      setSuccess("")
      let newNote = { id: note.id, uid: note.uid, title: titelRef.current.value, text: textRef.current.value }
      axios.put('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/update', newNote, {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      }).then((response) => {

        setLoading(false)
        setSuccess("Daten wurden aktualisiert")

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
        setSuccess("Notiz wurde aktualisiert")
      }).catch(() => {
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
    if (languageRef.current.value) {
      axios.put('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/translate/' + languageRef.current.value, note, {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      }).then((response) => {
        setNote(response.data)
        let tmp = ""
        languageRef.current.value === "fr" ? tmp = "Französisch" :
          languageRef.current.value === "tl" ? tmp = "Tagalog" :
            languageRef.current.value === "en" ? tmp = "Englisch" :
              languageRef.current.value === "ru" ? tmp = "Russisch" :
                languageRef.current.value === "es" ? tmp = "Spanisch" :
                  tmp = "was anderes"
        setSuccess("Notiz wurde in " + tmp + " übersetzt.")
        setLoading(false)
      }).catch(setLoading(false))
    }
    else {
      setError("Keine Sprache ausgewählt!")
      setLoading(false)
    }


  }
  function deleteNote(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    axios.delete('https://rest-api-cloud-4haunaqgaq-ew.a.run.app/notes/delete', { data: note, headers: { Authorization: 'Bearer ' + currentToken } }
    )
      .then(() => {
        setLoading(false)
        setSuccess("Notiz wurde gelöscht")
        navigate("/data")
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message)
      })
  }
  return (
    <div>
      <Card className="w-100 text-white bg-dark rounded-0">
        <Card.Header><center><h1>{formTitle}</h1></center></Card.Header>
        <Card.Body>

          <Form onSubmit={handleSubmit}>
            
              <Form.Group id="creationDate">
                <Form.Label>Datum</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(notEditable ? new Date() : new Date(note.creationDate))}
                />
              </Form.Group>
            
            {false &&
              <Form.Group id="UID">
                <Form.Label>UID</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={note.uid}
                />
              </Form.Group>
            }
            {false &&
              <Form.Group id="ID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={note.id}
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
                defaultValue={note.title}
              />
            </Form.Group>

            <Form.Group id="text">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea"
                rows={8}
                ref={textRef}
                value={note.text}
                required
                placeholder="Text eingeben..." />
            </Form.Group>
            {error && <Alert className="mt-2 mb-0" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
            {success && <Alert className="mt-2 mb-0" variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}
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
            {!notEditable &&
              <Row className="mt-2">
                <Col className="w-50">
                  <Form.Select ref={languageRef} defaultValue="" aria-label="Sprachauswahl">
                    <option>Sprache Auswählen</option>
                    <option value2="Englisch" value="en">Englisch</option>
                    <option value2="Französisch" value="fr">Französisch</option>
                    <option value2="Tagalog" value="tl">Tagalog</option>
                    <option value2="Russisch" value="ru">Russisch</option>
                    <option value2="Spanisch" value="es">Spanisch</option>
                  </Form.Select>
                </Col>
                <Col className="w-50">
                  <Button
                    onClick={translateNote.bind(this)}
                    variant="light"
                    className="w-100">
                    Übersetzen
                  </Button>
                </Col>
              </Row>
            }
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