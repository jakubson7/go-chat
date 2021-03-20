package main

import (
	"net/http"

	"github.com/jakubson7/go-chat/chat"
)

func main() {
	chat.Serve()
	http.ListenAndServe(":8080", nil)
}
