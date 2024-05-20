import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Update() {
  let { Id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const update = async () => {
    await axios
      .patch(`http://localhost:3000/api/posts/update/${Id}`, { title, content })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate("/");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="" style={{ textAlign: "left" }}>
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          style={{ height: 25 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="" style={{ textAlign: "left" }}>
          Content
        </label>
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          style={{ height: 25 }}
        />
      </div>
      <button onClick={update}>Update</button>
    </div>
  );
}
