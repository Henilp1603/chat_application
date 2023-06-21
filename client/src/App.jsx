import { useState } from 'react'
import './App.css'
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io('https://192.168.1.9:4000');

function App() {
 
  const [userName, setUserName] = useState('');
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);

  const joinRoom=()=>{
    if (userName !== "" && room !==""){
      socket.emit("join_room",room);
      setShowChat(true)
    }
  }
  return (
    <>
     <div className='main'>
      {
        !showChat ? (
          <div className='Join_con'>
          <h3 className='main_title'>Join Chat</h3>
        <input type="text" placeholder='username' onChange={(e)=>{setUserName(e.target.value)}} className='inpu_name' />
        <input type="text" placeholder='Room Id' onChange={(e)=>{setRoom(e.target.value)}} className='inpu_name' />
        <button onClick={joinRoom} className='j_btn' >Join</button>
        </div>
        ) : (
          <Chat socket={socket} userName={userName} room={room} />
        )
      }     
     </div>
    </>
  )
}

export default App
