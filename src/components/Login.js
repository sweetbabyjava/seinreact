import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      navigate("/")
    } catch {
      setError("Failed to log in")
    }
  }
  return (
    <>
      <h1 className="text-white bg-dark">
        <center>
          JustNotes.
        </center>
        <center>

        </center>
      </h1>
      <br></br>
      <h3 className="text-white bg-dark">
        <center>
          Notizen schreiben. Simplified.
        </center>
      </h3>
      <br></br>
      <h3 style={{ color: "white" }}>
      </h3>
      <Card className="shadow-box-example z-depth-5 text-white bg-dark rounded-0">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Passwort</Form.Label>
              <Form.Control type="password" ref={passwordRef} required autoComplete="off" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2 btn-light" type="submit">
              Einloggen
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="text-white" to="/forgot-password">Passwort vergessen?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        <h4 className="text-white bg-dark ">Noch kein Konto?</h4> <Link className="btn btn-dark w-100" to="/signup">Registrieren</Link>
      </div>
    </>

  )
}
