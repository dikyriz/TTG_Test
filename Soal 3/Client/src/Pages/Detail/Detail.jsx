import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  let { Id } = useParams();
  const [data, setData] = useState();

  const getData = async () => {
    await axios
      .get(`http://localhost:3000/api/posts/${Id}`)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
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
      <div>{data?.title}</div>
      <div>{data?.content}</div>
    </>
  );
}
