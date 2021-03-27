import { Message } from "src/types/chat"

export const formatMsg = (res: any): Message  => {
  const msg = JSON.parse(res.data).body
  return JSON.parse(msg)
}
