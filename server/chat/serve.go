package chat

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return conn, nil
}

func Serve() {
	hub := NewHub()

	http.HandleFunc("/chat/", func(w http.ResponseWriter, r *http.Request) {
		conn, wsErr := Upgrade(w, r)
		roomID, roomIdErr := r.URL.Query()["room"]
		name, nameErr := r.URL.Query()["name"]
		ID, IDErr := r.URL.Query()["id"]

		if wsErr != nil {
			fmt.Fprintf(w, "%+v\n", wsErr)
		}
		if !roomIdErr {
			fmt.Println("room error: ", roomIdErr)
			return
		}
		if !nameErr {
			fmt.Println("name error: ", roomIdErr)
			return
		}
		if !IDErr {
			fmt.Println("ID error: ", IDErr)
			return
		}

		fmt.Println("new connection open! room id: ", roomID[0], name[0])

		client := &Client{
			ID:     ID[0],
			RoomID: roomID[0],
			Name:   name[0],
			Conn:   conn,
		}
		if room, exist := hub.Rooms[client.RoomID]; exist {
			fmt.Println("joining to room: ", client.RoomID)
			client.Room = hub.Rooms[client.RoomID]
			room.Join <- client
		} else {
			fmt.Println("creating room: ", client.RoomID)
			hub.Rooms[client.RoomID] = NewRoom()
			hub.Rooms[client.RoomID].Join <- client
			go hub.Rooms[client.RoomID].Listen()
		}
		client.Listen()
	})
}
