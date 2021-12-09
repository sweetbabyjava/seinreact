import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import logo from '../Portrait_Placeholder.png';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <><center><h1 className="text-white bg-dark">Profil</h1></center>
      <Card className="text-white bg-dark rounded-0">
      <Card.Img variant="top" src={currentUser.photoURL ? currentUser.photoURL : logo} />
        <Card.Body>

          {error && <Alert variant="danger">{error}</Alert>}
          <ul>
            <li><strong>Name:</strong> {currentUser.displayName}</li>
            <li><strong>Email:</strong> {currentUser.email}</li>
            <li><strong>providerID:</strong> {currentUser.providerId}</li>
          </ul>
          <Link to="data" className="btn btn-light w-100 mt-3">
            Meine Notizen
          </Link>
          <Link to="update-profile" className="btn btn-light w-100 mt-3">
            Profil aktualisieren
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="dark" onClick={handleLogout}>
          Ausloggen
        </Button>
      </div>
    </>
  )
}
