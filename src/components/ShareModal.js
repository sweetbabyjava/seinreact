import React, { useEffect, useState} from 'react'
import { Button,Modal, Dropdown } from "react-bootstrap"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"

const ShareModal = ({shareModal, shareModalClose}) =>{
    const {currentToken} = useAuth()
    const [users, setUsers] = useState()

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


    return (
        <Modal centered show={shareModal} onHide={shareModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notiz teilen mit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Dropdown>
  <Dropdown.Toggle variant="dark" id="dropdown-basic center">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {users && users.map((user) => (
    <Dropdown.Item value={user.name}>{user.name}</Dropdown.Item>))
  }
  </Dropdown.Menu>
</Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={shareModalClose}>
            Zurück
          </Button>
          <Button variant="dark" onClick={shareModalClose}>
            Teilen
          </Button>
        </Modal.Footer>
      </Modal>
    )

};
export default ShareModal