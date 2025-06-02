import { useState, useEffect } from "react";
import api from "../api.js";
import Note from "../components/Note.jsx";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) =>
        alert(
          `An error occurred while fetching notes: ${
            error.response ? error.response.data.detail : error.message
          }`
        )
      );
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully");
        } else {
          alert("failed to delete note");
        }
        getNotes();
      })
      .catch((error) => alert(`error`));
    
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
        } else {
          alert("failed to create note");
        }
        getNotes();
      })
      .catch((error) => {
        alert(err);
      });
    
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
      </div>
      <h2>Create a Notes</h2>
      <form action="" onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content: </label>
        <br />
        <textarea
          type="text"
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
