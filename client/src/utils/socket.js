
let socket = new WebSocket("ws://localhost:8080/chat/?room=test");

export const connect = (cb, user) => {
  console.log("Attempting Connection...")

  socket.onopen = () => {
    console.log("Successfully Connected")
    //sendMsg(JSON.stringify(user))
  }

  socket.onmessage = msg => {
    console.log(msg)
    //cb(msg)
  }

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = err => {
    console.log("Socket Error: ", err)
  }
}

export const sendMsg = msg => {
  console.log("sending message: ", msg)
  socket.send(msg)
}
