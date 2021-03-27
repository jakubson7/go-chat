import { User } from "./auth"

export interface Message {
  user: User
  event: "user-join" | "user-leave" | "msg"
  msg: string
}
