import React, { Component } from "react";
import Contacts from './contacts.js';
import axios from "axios";

class Data extends Component {

  
  state = {
    contacts: []
  }
   componentDidMount() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    }
    axios.get('https://jsonplaceholder.typicode.com/users', headers)
    .then((response) => {this.setState({ contacts: response.data })})
    .catch(console.log)

  }
 
  render(){
  return (
    this.state.contacts && <Contacts contacts={this.state.contacts}/> 



  )
  }
}


export default Data