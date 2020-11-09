import React from 'react'
import { Route } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context'

export default function PrivateRoute({children, ...props}) {
  const {isAuthenticated, user, login} = useAuth0();
 
     return isAuthenticated && user ? <Route {...props}>
      {children}
    </Route> 
    : login()
 
}


