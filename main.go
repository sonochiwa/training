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

type YouTrackBody struct {
	AuthorName string `json:"author_name"`
}

func youtrack(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	decoder := json.NewDecoder(r.Body)
	var t YouTrackBody
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}

	if r.Method != "POST" {
		http.Error(w, "Only GET requests are supported", http.StatusMethodNotAllowed)
		return
	}

	res, _ := json.Marshal(Response{Message: t.AuthorName})
	w.Write(res)
}

func main() {
	port := "80"
	http.HandleFunc("/", index)
	http.HandleFunc("/youtrack", youtrack)
	fmt.Println("Server running on http://localhost:" + port)
	http.ListenAndServe(":"+port, nil)
}
