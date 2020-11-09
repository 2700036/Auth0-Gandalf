import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';

export default function SiteHeader() {
  const {isAuthenticated, login, logout, user} = useAuth0();
  
  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        {!isAuthenticated && 
        <button onClick={login}>Войти</button>        
        }
        {isAuthenticated && user && 
        <>
        <span>{user.name}</span>
        <button onClick={logout}>Выйти</button>
        </>
        }
      </div>
    </div>
  );
}
