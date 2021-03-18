
let socket = new WebSocket("ws://localhost:8080/ws");

export const connect = () => {
  console.log("Attempting Connection...")

  socket.onopen = () => {
    console.log("Successfully Connected")
  }

  socket.onmessage = msg => {
    console.log(msg)
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
