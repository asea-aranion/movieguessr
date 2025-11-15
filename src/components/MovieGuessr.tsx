import "./MovieGuessr.css";
import { useState, useEffect } from "react";
import { getMovieData, getRandomMovieID } from "../utils";
import type { Movie } from "../types";
import HintGrid from "./HintGrid";
import "./EndGamePopup.css";
import EndGamePopup from "./EndGamePopUp";

function MovieGuessr() {
    const [data, setData] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);

    const [hintCount, setHintCount] = useState(1);
    const [guess, setGuess] = useState("");
    const [points, setPoints] = useState(5000);
    const [win, setWin] = useState(false);
    const [guessIsWrong, setGuessIsWrong] = useState(false);

    useEffect(() => {
        const movieID = getRandomMovieID();

        getMovieData(movieID)
            .then((movie) => {
                console.log(movie);
                setData(movie);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    // Handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
    };

    // verify guess
    const verifyGuess = () => {
        // TODO: need to check if guess is close enough to answer
        return guess.trim().toLowerCase() === data?.title.toLowerCase();
    };

    // Handle form submission
    const submitGuess = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const isCorrect = verifyGuess(); // checks if answer is correct
        if (isCorrect || points <= 1000) {
            setShowPopUp(true);

            if (isCorrect) {
                setWin(true);
            }
        } else {
            setHintCount((hintCount) => {
                if (hintCount < 5) {
                    return hintCount + 1;
                } else {
                    return hintCount;
                }
            });
            setPoints((points) => points - 1000);
            setGuessIsWrong(true);
            setTimeout(() => {
                setGuessIsWrong(false);
            }, 700);
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
                        className={
                            "guess-input" + (guessIsWrong ? " wrong" : "")
                        }
                        type="text"
                        value={guess}
                        placeholder="guess that movie!"
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

                {showPopUp && <EndGamePopup win={win} />}
            </div>
        );
    } else {
        return <p>Movie not found</p>;
    }
}

export default MovieGuessr;
