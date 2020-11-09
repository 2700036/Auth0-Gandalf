import React, { createContext, useEffect, useState, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Home from '../pages/Home';

const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth0() {
      const auth0 = await createAuth0Client({
        domain: 'biryukov.us.auth0.com',
        client_id: 'mpayDn3ntPFM90C50mlpabJOwUe9Z6jN',
        redirect_uri: window.location.origin
      });
      setAuthClient(auth0);

      if(window.location.search.includes('code=') && 
      window.location.search.includes('state=')      
      ){
        try {          
          await auth0.handleRedirectCallback()          
        }
        catch (err) {
          alert(err)
        }
        window.location.replace(window.location.pathname);
      }
      console.log(window.location)

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }
      setIsLoading(false);
    }

    initAuth0();
  }, []);
  if(isLoading) return <Home>Загрузка...</Home>

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: (...p) => authClient?.loginWithRedirect(...p),
        logout: (...p) => authClient.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
