import React from "react";
import { useState } from "react";
import '../styles/App.css';
const Contact = () => {
  // use state Hook
  const [name, setName] = useState("Initial");
  return <div>
    <form>
      <input type="text" placeholder="Name..." onChange={(e)=> setName(e.target.value)}/>
      <input type="email" placeholder="Email..." />
      
    </form>
      <button>Press</button>
      <p>{name}</p>
  </div>;
};

export default Contact;
