import React, { useEffect } from "react"
import { connect, sendMsg } from "./utils/socket"


const Application = () => {
  useEffect(() => {
    connect()
  })

  const handleSendMsg = msg => () => {
    sendMsg(msg)
  }

  return (
    <div>
      <button onClick={handleSendMsg("abc")}>send message</button>
    </div>
  )
}

export default Application
