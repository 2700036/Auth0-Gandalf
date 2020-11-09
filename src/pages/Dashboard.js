import React from 'react';
import { useAuth0 } from '../contexts/auth0-context';
import Frodo from '../img/frodo.png';

export default function Dashboard() {
  const {user: {name}} = useAuth0()
  return (
    <div className="page dashboard">
      <div>
        <img src={Frodo} alt="Frodo" />
  <h2>{`Привет, ${name}!`}</h2>
      </div>
    </div>
  );
}
