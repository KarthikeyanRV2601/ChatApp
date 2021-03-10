import React,{useState} from 'react'
import './Users.css'
import backIcon from '../icons/backIcon.jpg';
export default function Users({users,showPeople,setShowPeople}) {
    const ClickHandler=(e)=>{
        e.preventDefault();
        setShowPeople(false)
    }
    return (
        showPeople?
        <div className="usersContainer">
            <button onClick={e=>ClickHandler(e)}><img className="backIcon" src={backIcon}/></button>
            <p className="status">users online</p>
            {users.map((user)=><div className="user"><p>{user.name}</p></div>)}
        </div>:null
        
    )
}
