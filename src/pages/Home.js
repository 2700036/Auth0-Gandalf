import React from 'react';
import Gandalf from '../img/gandalf.png';

export default function Home() {
  return (
    <div className="page home">
      <div>
        <img src={Gandalf} alt="Gandalf" />
        <h2>Ты не пройдёшь!!</h2>
      </div>
    </div>
  );
}
