package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type client struct {
	ID   string
	Conn *websocket.Conn
	Pool *pool
}
type message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}
type pool struct {
	Register   chan *client
	Unregister chan *client
	Clients    map[*client]bool
	Broadcast  chan message
}

func newPool() *pool {
	return &pool{
		Register:   make(chan *client),
		Unregister: make(chan *client),
		Clients:    make(map[*client]bool),
		Broadcast:  make(chan message),
	}
}
func (c *client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		mess := message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- mess
		fmt.Printf("Message Received: %+v\n", mess)
	}
}

func (pl *pool) Start() {
	for {
		select {
		case clt := <-pl.Register:
			pl.Clients[clt] = true
			fmt.Println("Size of Connection Pool: ", len(pl.Clients))

			for clt, _ := range pl.Clients {
				fmt.Println(clt)
				clt.Conn.WriteJSON(message{Type: 1, Body: "New User Joined..."})
			}
			break
		case clt := <-pl.Unregister:
			delete(pl.Clients, clt)
			fmt.Println("Size of Connection Pool: ", len(pl.Clients))

			for clt, _ := range pl.Clients {
				clt.Conn.WriteJSON(message{Type: 1, Body: "User Disconnected..."})
			}
			break
		case mess := <-pl.Broadcast:
			fmt.Println("Sending message to all clients in Pool")

			for clt, _ := range pl.Clients {
				if err := clt.Conn.WriteJSON(mess); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func wsEndpoint(pl *pool, w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	clt := &client{
		Conn: conn,
		Pool: pl,
	}

	pl.Register <- clt
	clt.Read()
}

func main() {
	pl := newPool()
	go pl.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsEndpoint(pl, w, r)
	})
	log.Fatal(http.ListenAndServe(":8080", nil))
}
