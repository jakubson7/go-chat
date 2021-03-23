import { parseMsg } from "./json"

export let socket

export const connect = ({ handleJoin, handleLeave, handleErr, handleMsg, user }) => {
  socket = new WebSocket(`ws://localhost:8080/chat/?room=${user.roomID}&name=${user.name}&id=${user.ID}`)
  console.log("Attempting Connection...")

  socket.onopen = () => {
    console.log("Successfully Connected")
    handleJoin()
  }
  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    handleLeave(event)

  }
  socket.onerror = err => {
    console.log("Socket Error: ", err)
    handleErr(err)
  }

  socket.onmessage = msg => {
    console.log(parseMsg(msg))
    handleMsg(parseMsg(msg))
  }
}

export const sendMsg = (name, msg, event = "send-msg") => {
  console.log("sending message: ", msg)
  socket.send(JSON.stringify({
    event,
    msg,
    user: name,
  }))
}
