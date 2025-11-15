import "./MovieGuessr.css";
import { useState, useEffect } from "react";
import { getRandomMovieID } from "./utils";

function MovieGuessr() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movieID = getRandomMovieID();

    fetch(
      `https://api.themoviedb.org/3/find/${movieID}?external_source=imdb_id&api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>MovieGuessr</h1>
      <p></p>
    </div>
  );
}

export default MovieGuessr;
