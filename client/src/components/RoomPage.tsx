import React from "react"
import { useParams } from "react-router"

export interface Params {
  ID: string
}

const RoomPage: React.FC = () => {
  const { ID } = useParams<Params>()

  return (
    <main>
      { ID }
    </main>
  )
}

export default RoomPage
