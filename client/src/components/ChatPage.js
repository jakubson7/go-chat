import React, { useEffect, useState } from "react"
import { connect, sendMsg } from "../utils/chat"

const ChatPage = () => {
  const [user] = useState({
    ID: toString(Math.random()),
    roomID: "0000",
    name: "test",
  })
  const [currentMsg, setCurrentMsg] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    connect({
      handleJoin,
      handleLeave,
      handleErr,
      handleMsg,
      user,
    })
  }, [])

  const handleJoin = () => {}
  const handleLeave = () => {}
  const handleErr = () => {}
  const handleMsg = msg => setMessages(messages => [...messages, msg])
  const handleSendMsg = () => {
    sendMsg(user.name, currentMsg)
  }
  
  return (
    <main>
      <section>
        {messages.map((msg, index) => {
          if(msg.event === "user-join" || msg.event === "user-leave") return <p key={index}>-- {msg.msg} --</p>
          else return <p key={index}>{msg.user}: {msg.msg}</p>

        })}
      </section>
      <section>
        <input
          type="text"
          defaultValue={currentMsg}
          onKeyUp={({ currentTarget }) => setCurrentMsg(currentTarget.value)}
        />
        <button onClick={handleSendMsg}>send</button>
      </section>
    </main>
  )
}

export default ChatPage
