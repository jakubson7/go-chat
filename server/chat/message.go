package chat

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}
