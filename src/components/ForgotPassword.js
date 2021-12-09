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
      <Card className="w-100 text-white bg-dark rounded-0">
        <Card.Body>
          <h2 className="text-center mb-4">Passwort vergessen</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 btn-light" type="submit">
              Passwort zurücksetzen
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="w-100  btn btn-light"to="/login">Einloggen</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <h4 className="text-white bg-dark">Noch kein Konto?</h4> <Link class="text-white btn btn-dark w-100" to="/signup">Registrieren</Link>
      </div>
    </>
  )
}
