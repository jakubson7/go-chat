import { User } from "src/types/auth"
import { Message } from "src/types/chat"

let socket

interface ConnectChatArgs {
  user: User
  handleJoin(): void
  handleLeave(): void
  handleMsg(msg: Message): void
}

export const connectChat = ({
  user,
  handleJoin,
  handleLeave,
  handleMsg,
}: ConnectChatArgs) => {
  socket = new WebSocket(`ws://localhost:8080/chat/?room=${user.roomID}&id=${user.ID}&name=${user.name}`)

  socket.onopen = () => {
    handleJoin()
  }
  socket.onclose = () => {
    handleLeave()
  }
}

export const sendMsg = () => {

}
