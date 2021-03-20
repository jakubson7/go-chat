import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { connect, sendMsg } from "../utils/socket"

const Container = styled.main`

`
const ChatContainer = styled.section`

`
const InputContainer = styled.section`

`
const Input = styled.input`

`
const Button = styled.button`

`
const Message = styled.p`
`

const ChatPage = () => {
  const [currentMsg, setCurrentMsg] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    connect(handleReciveMsg, {
      ID: toString(Math.random()),
      roomID: "0000",
      name: "test",
    })
  }, [])

  const handleReciveMsg = msg => setMessages(messages => [...messages, msg])
  const handleSendMsg = () => {
    sendMsg(currentMsg)
  }
  
  return (
    <Container>
      <ChatContainer>
        {messages.map((msg, index) => {
          console.log(msg, index)
          return <Message key={index}>{JSON.parse(msg.data).body}</Message>
        })}
      </ChatContainer>
      <InputContainer>
        <Input
          type="text"
          defaultValue={currentMsg}
          onKeyUp={({ currentTarget }) => setCurrentMsg(currentTarget.value)}
        />
        <Button onClick={handleSendMsg}>send</Button>
      </InputContainer>
    </Container>
  )
}

export default ChatPage
