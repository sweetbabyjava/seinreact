import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPass } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPass(emailRef.current.value)
      setMessage("Eine Email mit einem Link zum zurücksetzen des Passwortes wurde versandt.")
    } catch {
      setError("Etwas ist schiefgelaufen")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Passwort vergessen</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Passwort zurücksetzen
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Einloggen</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <h4>Noch kein Konto?</h4> <Link class="link-light" to="/signup">Registrieren</Link>
      </div>
    </>
  )
}
