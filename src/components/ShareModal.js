import React, { useEffect, useState } from 'react'
import { Button, Modal, Dropdown, DropdownButton } from "react-bootstrap"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"

const ShareModal = ({ note, shareModal, shareModalClose, setSuccess, setError }) => {
    const { currentToken } = useAuth()
    const [users, setUsers] = useState()
    const [user, setUser] = useState()
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
        axios.put(process.env.REACT_APP_AXIOS_BASE_URL + 'notes/share/' + user, note, {
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

    const handleSelect=(eventKey, event)=>{
        event.preventDefault();
        setUser(eventKey);
        console.log(eventKey);
      }


    return (
        <Modal centered show={shareModal} onHide={shareModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notiz teilen mit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown >
                    <DropdownButton variant="dark" title="Auswählen" onSelect={handleSelect} >
                        {users && users.map((user) => (
                            <Dropdown.Item key={user.id}
                                eventKey={user.uid}
                                >
                                {user.displayName}
                            </Dropdown.Item>))
                        }
                    </DropdownButton>
                </Dropdown>
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