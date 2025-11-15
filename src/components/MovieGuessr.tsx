import "./MovieGuessr.css";
import { useState, useEffect } from "react";
import { getMovieData, getRandomMovieID } from "../utils";
import type { Movie } from "../types";
import HintGrid from "./HintGrid";

function MovieGuessr() {
    const [data, setData] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [hintCount, setHintCount] = useState(1);
    const [guess, setGuess] = useState("");
    const [points, setPoints] = useState(5000);

    useEffect(() => {
        console.log(data);
        console.log(loading);
        console.log(error);
        const movieID = getRandomMovieID();

        getMovieData(movieID)
            .then((movie) => {
                console.log(movie);
                setData(movie);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setError(e);
                setLoading(false);
            });
    }, []);

    // Handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
    };

    /**
     * @returns whether the guess matches the answer
     */
    const verifyGuess = () => {
        // TODO: need to check if guess is close enough to answer
        return guess.toLowerCase() !== guess.toLowerCase();
    };

    // Handle form submission
    const submitGuess = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default browser form submission
        console.log("Form submitted:", guess);
        if (verifyGuess()) {
            console.log("Correct Guess!");
            // TODO: need to prompt into starting a new game
        } else {
            setHintCount((hintCount) => hintCount + 1);
            setPoints((points) => points - 1000);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    } else if (data) {
        return (
            <div className="movieguessr-container">
                <h1>MovieGuessr</h1>

                <div className="stats-container">
                    <div className="hint-count-container">
                        <h6 className="hint-count">{hintCount}</h6>
                        <p className="hint-count-text">
                            {hintCount === 1 ? "hint" : "hints"} used
                        </p>
                    </div>
                    <div className="point-count-container">
                        <h6 className="point-count">{points}</h6>
                        <p className="point-count-text">points</p>
                    </div>
                </div>

                <HintGrid hintCount={hintCount} movieData={data} />
                <form className="guess-form">
                    <input
                        className="guess-input"
                        type="text"
                        value={guess}
                        onChange={handleChange}
                    />
                    <button
                        className="submit-button"
                        type="submit"
                        onClick={submitGuess}
                    >
                        Submit Guess
                    </button>
                </form>
            </div>
        );
    } else {
        return <p>Movie not found</p>;
    }
}

export default MovieGuessr;
