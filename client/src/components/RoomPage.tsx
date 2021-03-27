import React from "react"
import { useParams } from "react-router-dom"
import Chat from "./chat"

export interface Params {
  ID: string
}

const RoomPage: React.FC = () => {
  const { ID } = useParams<Params>()

  return (
    <main>
      { ID }
      <Chat ID={ID}></Chat>
    </main>
  )
}

export default RoomPage
