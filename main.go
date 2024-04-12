package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != "GET" {
		http.Error(w, "Only GET requests are supported", http.StatusMethodNotAllowed)
		return
	}
	res, _ := json.Marshal(Response{Message: "hi"})
	w.Write(res)
}

func main() {
	http.HandleFunc("/", index)
	fmt.Println("Server running on http://localhost:7000")
	http.ListenAndServe(":7000", nil)
}
