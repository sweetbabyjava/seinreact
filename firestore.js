import { db } from "../firebase.js"
import { collection, getDocs } from 'firebase/firestore/lite';
import { Component } from "react"
import Contacts from './contacts.js'


class DataFire extends Component {


state = {
    contacts: []
  }

  componentDidMount() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol)
    .then(res => res.json())
    .then((data) => {
        this.setState({ contacts: data })
      })
      .catch(console.log)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwörter stimmmen nicht überein")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateDoc(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePass(passwordRef.current.value))
    }

    Promise.all(promises)
    .then(() => {
      navigate("/")
    })
    .catch(() => {
      setError("Etwas ist schiefgelaufen")
    })
    .finally(() => {
      setLoading(false)
    })
  }
 
  render(){
  return (
    this.state.contacts && <Contacts contacts={this.state.contacts}/> 



  )
  }
}


export default DataFire