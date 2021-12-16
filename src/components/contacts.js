import React, {useState} from 'react'
import { Alert, Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

const Contacts = ({ notes, noteType }) => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentToken } = useAuth()
  const navigate = useNavigate()

  function handleWithdraw(note){
    setLoading(true)

    axios.put(process.env.REACT_APP_AXIOS_BASE_URL+'notes/withdraw', note, {
      headers: {
        Authorization: 'Bearer ' + currentToken
      }
    }).then((response) => {

      setLoading(false)
      setSuccess("Notiz wurde entfernt")
      navigate("/")

    }).catch(() => {
      setLoading(false)
      setError("Notiz konnte nicht enfernt werden")})

    
  }

  function dateDiff(date1, date2) {
    return (Math.ceil((date2 - date1) / 8.64e7))*-1;
  }
  return (
    <div>
     {error && <Alert className="mt-2 mb-0" variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
     {success && <Alert className="mt-2 mb-0" variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}
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
              state={{ detail: note, noteType: noteType, formTitle: "Notiz bearbeiten", notEditable: false }}
              className="btn btn-light w-100 mt-3">Anzeigen
          </Link>
          {noteType === "shared" &&
            <Button
              onClick={() => handleWithdraw(note)}
              disabled={loading}
              variant="light"
              className="w-100 mt-2">
              Entfernen
            </Button>
            }

          </Card.Footer>
          
        </Card>
      ))}
    </div>


  )
};

export default Contacts