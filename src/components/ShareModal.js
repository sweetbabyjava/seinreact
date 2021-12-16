import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal,Form } from "react-bootstrap"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"

const ShareModal = ({ note, shareModal, shareModalClose, setSuccess, setError }) => {
    const { currentToken } = useAuth()
    const [users, setUsers] = useState()
    const userRef = useRef()

    useEffect(() => {
        axios.get(process.env.REACT_APP_AXIOS_BASE_URL + 'users', {
            headers: {
                Authorization: 'Bearer ' + currentToken
            }
        }).then((response) => {
            setUsers(response.data)
            console.log(response.data)
        }).catch()
    }, [currentToken]);

    function handleShare() {
        shareModalClose()
        axios.put(process.env.REACT_APP_AXIOS_BASE_URL + 'notes/share/' + userRef.current.value, note, {
            headers: {
                Authorization: 'Bearer ' + currentToken
            }

        }).then(() => {
            setSuccess("Notiz wurde geteilt.")
            console.log("Sharing succesful")
        }).catch(() => {
            setError("Es ist ein Fehler passiert. Versuche es später noch einmal.")
        }
        )

    };
    return (
        <Modal centered size="sm" show={shareModal} onHide={shareModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notiz teilen mit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Select ref={userRef} defaultValue="" aria-label="Sprachauswahl" className="w-50 m-auto">
            {users && users.map((user) => (
                            <option key={user.id}
                            value={user.uid}
                                >
                                {user.displayName}
                            </option>))
                        }
                  </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={shareModalClose}>
                    Zurück
                </Button>
                <Button variant="dark" onClick={handleShare}>
                    Teilen
                </Button>
            </Modal.Footer>
        </Modal>
    )

};
export default ShareModal