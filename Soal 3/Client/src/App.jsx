import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import NewTodos from "./Component/NewTodos/NewTodos";

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    await axios
      .get("http://localhost:3000/api/posts")
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = async (Id) => {
    await axios
      .delete(`http://localhost:3000/api/posts/delete/${Id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Todo List</h1>
      <NewTodos />
      {data?.map((item) => (
        <>
          <div
            className="card"
            style={{
              flexDirection: "row",
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div style={{ backgroundColor: "gray", minWidth: 400 }}>
              <Link style={{ color: "white" }} to={`/detail/${item.id}`}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </Link>
            </div>
            <div style={{}}>
              <button style={{ marginRight: 16 }}>
                <Link to={`/edit/${item.id}`}>Edit</Link>
              </button>
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </div>
          </div>
        </>
      ))}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
