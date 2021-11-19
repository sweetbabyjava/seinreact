import React, { Component } from "react";
import Contacts from './contacts.js';
import axios from "axios";

class Data extends Component {

 
  state = {
    contacts: []
  }
   componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {this.setState({ contacts: response.data })})
    /* fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log) */
  }
 
  render(){
  return (
    this.state.contacts && <Contacts contacts={this.state.contacts}/> 



  )
  }
}


export default Data