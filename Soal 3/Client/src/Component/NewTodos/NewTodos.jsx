import { useState } from "react";
import axios from "axios";

export default function NewTodos() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const submit = async () => {
    await axios
      .post("http://localhost:3000/api/posts/store", {
        title,
        content,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        justifyContent: "center",
      }}
    >
      <div style={{}}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ marginRight: 16, height: 25 }}
        />
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ height: 25 }}
        />
      </div>
      <button type="submit" onClick={submit}>
        New Todo
      </button>
    </div>
  );
}
