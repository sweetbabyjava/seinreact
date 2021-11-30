import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut,sendPasswordResetEmail, onAuthStateChanged, updatePassword, updateEmail} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [currentToken, setToken] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPass(email) {
    return sendPasswordResetEmail(auth,email)
  }

  function updateMail(email) {
    return updateEmail(currentUser,email)
  }

  function updatePass(password) {
    return updatePassword(currentUser,password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
      user.getIdToken().then( idToken => {
        
        setToken(idToken)
      })
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    currentToken,
    login,
    signup,
    logout,
    resetPass,
    updateMail,
    updatePass
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
