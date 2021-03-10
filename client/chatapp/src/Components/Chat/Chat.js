import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from '../Infobar/infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Users from '../Users/Users';
let socket;
export default function Chat({location}) {
    
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const Endpoint='https://react-chat-app-karthik.herokuapp.com/cd..';
    const [showPeople,setShowPeople]=useState(false);

    useEffect(()=>{
        const {name,room}=queryString.parse(location.search)//returns an object
        socket=io(Endpoint);
        
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},()=>{
           
        });
        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[Endpoint,location.search]);
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    useEffect(()=>{
        socket.on('roomData',details=>{
            setUsers(details.users);
        })
    },[users])

    //create a function for sending messages
    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} showPeople={showPeople} setShowPeople={setShowPeople}/>
                <Messages messages={messages} name={name}></Messages>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <Users users={users} showPeople={showPeople} setShowPeople={setShowPeople}></Users>
            </div>
        </div>
    )
}
