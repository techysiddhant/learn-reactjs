import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";
const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);
  const user = allusers.find((ele) => ele.id === id);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h3>{user.age}</h3>
        <h4>{user.gender}</h4>
      </div>
    </div>
  );
};

export default CustomModal;
