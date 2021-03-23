package chat

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID     string
	RoomID string
	Name   string
	Conn   *websocket.Conn
	Room   *Room
}

func (c *Client) Listen() {
	defer func() {
		c.Room.Leave <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}

		message := Message{Type: messageType, Body: string(p)}
		c.Room.Broadcast <- message
	}
}
