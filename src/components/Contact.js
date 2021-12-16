import { useLocation, Link, useNavigate } from "react-router-dom"
import React, { useRef, useState} from "react"
import { Form, Button, Card, Alert, Row, Col} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";
import ShareModal from './ShareModal.js';

export default function Contact() {
  const titelRef = useRef()
  const textRef = useRef()
  const languageRef = useRef()
  const location = useLocation()
  const { detail,noteType, formTitle, notEditable } = location.state
  const [note, setNote] = useState(detail)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [changed, setChanged] = useState(false)
  const { currentToken } = useAuth()
  const navigate = useNavigate()
  const [shareModal, setShareModal] = useState(false)

  const shareModalClose = () => setShareModal(false);
  const shareModalShow = () => setShareModal(true);

  

  function handleChange(e) {
    e.preventDefault()
    setNote({...note,text: e.target.value});
    setChanged(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (note.title !== titelRef.current.value || changed) {
      setError("")
      setSuccess("")
      let newNote = { id: note.id, uid: note.uid, title: titelRef.current.value, text: textRef.current.value }
      axios.put(process.env.REACT_APP_AXIOS_BASE_URL+'notes/update', newNote, {
        headers: {
          Authorization: 'Bearer ' + currentToken
        }
      }).then((response) => {

        setLoading(false)
        setChanged(false)
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
      axios.post(process.env.REACT_APP_AXIOS_BASE_URL+'notes/create', note, {
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
      axios.put(process.env.REACT_APP_AXIOS_BASE_URL+'notes/translate/' + languageRef.current.value, note, {
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
                languageRef.current.value === "de" ? tmp = "Deutsch" :
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
    axios.delete(process.env.REACT_APP_AXIOS_BASE_URL+'notes/delete', { data: note, headers: { Authorization: 'Bearer ' + currentToken } }
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
                  placeholder={new Intl.DateTimeFormat("de-DE", {
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
                rows={6}
                ref={textRef}
                value={note.text}
                placeholder= {note.text ? note.text : "Text eingeben..." }
                onChange={handleChange}/>
            </Form.Group>
            {error && <Alert className="mt-2 mb-0" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
            {success && <Alert className="mt-2 mb-0" variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}
            {!notEditable && noteType === "own" && 
              <Button disabled={loading} className="w-100 mt-2 btn-light" type="submit">
                Speichern
              </Button>
            }
            {notEditable && noteType === "own" &&
            <Button
              onClick={addNote}
              disabled={loading}
              variant="light"
              className="w-100 mt-2">
              Hinzufügen
            </Button>
            }
            {!notEditable && noteType !== "shared" &&
              <Row className="mt-2">
                <Col className="w-50">
                  <Form.Select ref={languageRef} defaultValue="" aria-label="Sprachauswahl">
                    <option>Sprache Auswählen</option>
                    <option value="en">Englisch</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Französisch</option>
                    <option value="tl">Tagalog</option>
                    <option value="ru">Russisch</option>
                    <option value="es">Spanisch</option>
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
            {!notEditable && noteType !== "shared" &&
              <Button
                onClick={deleteNote}
                disabled={loading}
                variant="light"
                className="w-100 mt-2">
                Löschen
              </Button>
            }
            {!notEditable && noteType !== "shared" &&
              <Button
                onClick={shareModalShow}
                disabled={loading}
                variant="light"
                className="w-100 mt-2">
                Teilen
              </Button>
            }

          </Form>
        </Card.Body>
      </Card>
      <ShareModal note={note} setSuccess={setSuccess} setError={setError} shareModal={shareModal} shareModalClose={shareModalClose}></ShareModal>
      <Link to="/data" className="btn btn-dark w-100 mt-3">
        Zurück
      </Link>
    </div>
  )
};