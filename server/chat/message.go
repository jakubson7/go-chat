package chat

import (
	"encoding/json"
	"fmt"
)

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

type MessageBody struct {
	User  string `json:"user"`
	Event string `json:"event"`
	Msg   string `json:"msg"`
}

func NewMessage(userName string, event string, msg string) Message {
	body, err := json.Marshal(MessageBody{
		User:  userName,
		Event: "user-join",
		Msg:   "new user has joined the chat",
	})

	if err != nil {
		return Message{
			Type: 1,
			Body: "error",
		}
	}

	fmt.Println(string(body))

	return Message{
		Type: 1,
		Body: string(body),
	}
}
