import React, { Component } from "react"
import Contacts from './contacts.js'
import { Link, useNavigate } from "react-router-dom"
import { Card, Button, Alert } from "react-bootstrap"


class Data extends Component {

  state = {
    contacts: []
  }
   componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }
 
  render(){
  return (
    this.state.contacts && <Contacts contacts={this.state.contacts}/> 



  )
  }
}


export default Data