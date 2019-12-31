import React from 'react'
import { IoMdClose, IoMdOpen} from "react-icons/io";
import './InfoBar.css'

const InfoBar = ({ room }) => (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <IoMdOpen className="onlineIcon"  />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><IoMdClose /></a>
      </div>
    </div>
  );
  
  export default InfoBar;
