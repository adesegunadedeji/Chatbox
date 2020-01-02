import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import io from 'socket.io-client'
import Messages from '../Messages/Messages'
import './Chat.css'
import TextBox from '../TextBox/TextBox'

let socket;

const Chat =({location})=>{

    const [name, setName] = useState('');

    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] =useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'wss://chatbox-react.herokuapp.com/'

    useEffect(() => {
        const { name,room } = queryString.parse(location.search);
        const data = queryString.parse(location.search);
        console.log(location.search);
        console.log(data);
        socket =io(ENDPOINT)

        setName(name);
        setRoom(room);

    socket.emit('join', { name, room }, () => {  
      });
      return() =>{
        socket.emit('disconnect');
        socket.disconnect();
      }
    }, [ENDPOINT, location.search])

    useEffect(()=>{
      socket.on('message', (message) =>{
        setMessages([...messages, message]); //Spread Operator adding Message to to Messages Array
      });


      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })

      
    return () => {
      socket.emit('disconnect');

      socket.off();
    }

    },[messages]);


    //Function to send Messages
    const sendMessage = (event) =>{
      event.preventDefault();
      if(message){
        socket.emit('sendMessage', message, ()=> setMessage(''));
      }
    }
    console.log(message,messages)


    return (
        <div className="outerContainer">
          <div className="container">
            <InfoBar room = {room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
{/* <input value={message} onChange={(event) => setMessages(event.target.value)} onKeyPress ={event => event.key === 'Enter' ? sendMessage(event) : null }/> */}
       <TextBox users = {users}/>
       </div>
        </div>
    )
  
}
export default Chat;