import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePass, updateMail, updateName } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwörter stimmmen nicht überein")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateName(nameRef.current.value))
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateMail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePass(passwordRef.current.value))
    }

    Promise.all(promises)
    .then(() => {
      navigate("/")
    })
    .catch(() => {
      setError("Etwas ist schiefgelaufen")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profil bearbeiten</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="displayName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Passwort</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leer lassen, um das Gleiche beizubehalten"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Passwort bestätigen</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leer lassen, um das Gleiche beizubehalten"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Aktualisieren
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link class="link-light" to="/">Abbrechen</Link>
      </div>
    </>
  )
}
