import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout, currentToken } = useAuth()
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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <ul>
          <li><strong>Name:</strong> {currentUser.displayName}</li>
          <li><strong>Telefon:</strong> {currentUser.phoneNumber}</li>
          <li><strong>Email:</strong> {currentUser.email}</li>
          <li><strong>providerID:</strong> {currentUser.providerId}</li>
          <li><strong>uid:</strong> {currentUser.uid}</li>
          <li><strong>Token:</strong> {currentToken}</li>
          </ul>
          <Link to="data" className="btn btn-primary w-100 mt-3">
            Daten ansehen
          </Link>
          <Link to="data2" className="btn btn-primary w-100 mt-3">
            Daten2 ansehen
          </Link>
          <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Profil aktualisieren
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Ausloggen
        </Button>
      </div>
    </>
  )
}
