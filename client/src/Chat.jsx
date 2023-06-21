import React, { useEffect, useState } from 'react'

const Chat = ({socket,userName,room}) => {
    const [currentMsg,setCurrentMsg]=useState("");
    const [messgeList,setMessgeList]=useState([]);

    const sendMsg=async()=>{
        if (currentMsg !== "") {
            const msgData={
                room:room,
                author:userName,
                message:currentMsg,
                time:new Date(Date.now()).getHours()+":"+ new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_msg",msgData)
            setMessgeList((list) => [...list, msgData]);
            setCurrentMsg("");
        
        }
    }

    useEffect(()=>{
        socket.on("receive_msg",(data)=>{
            console.log(data)
            setMessgeList((list) => [...list, data]);
        });
    },[socket]);

  return (
    <div className='main_chat_con'>
      <div className='chat_con'>
      <div className='chat_header'>
        <p className='live_txt'>Live  Chat</p>
      </div>
      <div className='chat_body'>
        {
            messgeList.map((messageContent)=>{
              return (
                <div
                  className="message"
                  id={userName === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message_content">
                      <p>{messageContent.author}:{messageContent.message}</p>
                    </div>
                    {/* <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div> */}
                  </div>
                </div>
              );
            })

        
        }

      </div>
      <div className='chat_footer'>
        <input type="text" placeholder='hello...' onChange={(e)=>{setCurrentMsg(e.target.value)}} className='send_inp' />
        <button onClick={sendMsg} className='send_btn'>&#9658;</button>
      </div>
      </div>
    </div>
  )
}

export default Chat
