import React from 'react';
import './infobar.css';
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';
import people from '../icons/people.png';
export default function Infobar({room,showPeople,setShowPeople}){

    const ClickHandler=(e)=>{
        e.preventDefault();
        setShowPeople(true)
    }

    return (
        
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon}/>
                <h3>{room}</h3>
            </div>
            <button className="showPeople" onClick={e=>ClickHandler(e)}><img className="showPeople" src={people}/></button>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close image" /></a>
            </div>
        </div>
    )
}
