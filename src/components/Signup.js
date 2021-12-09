import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwörter stimmen nicht überein")
    }

    
      setError("")
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value)
      .then(() => {setLoading(false); navigate("/")})
      .catch((error)=> {
        console.log(error.message)
        if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
          setError("Das Passwort muss mindestens 6 Zeichen enthalten.")
          setLoading(false)
        }
      })
    
  }

  return (
    <><center><h1 className="text-white bg-dark">Registrieren</h1></center>
      <Card className="text-white bg-dark rounded-0">
        <Card.Body>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                ref={emailRef}
                placeholder="z.B. test@beispiel.de" 
                required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Passwort</Form.Label>
              <Form.Control 
                type="password" 
                ref={passwordRef} 
                required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Passwort wiederholen</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2 btn-light" type="submit">
              Registrieren
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      <h4 className="text-white bg-dark">Bereits ein Konto?</h4> <Link className="text-white btn btn-dark w-100" to="/login">Einloggen</Link>
      </div>
    </>
  )
}
