package chat

import (
	"fmt"
)

type Room struct {
	Join      chan *Client
	Leave     chan *Client
	Broadcast chan Message
	Clients   map[*Client]bool
}

func NewRoom() *Room {
	return &Room{
		Join:      make(chan *Client, 4),
		Leave:     make(chan *Client, 4),
		Broadcast: make(chan Message, 12),
		Clients:   make(map[*Client]bool),
	}
}

func (room *Room) Listen() {
	for {
		select {
		case client := <-room.Join:
			client.Room = room
			room.Clients[client] = true
			for c := range room.Clients {
				c.Conn.WriteJSON(NewMessage(client.Name, "user-join", "new user has joined the chat"))
			}
			break

		case client := <-room.Leave:
			delete(room.Clients, client)
			for c := range room.Clients {
				c.Conn.WriteJSON(NewMessage(client.Name, "user-leave", "user has left the chat"))
			}
			break

		case msg := <-room.Broadcast:
			for c := range room.Clients {
				if err := c.Conn.WriteJSON(msg); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
