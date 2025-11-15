import "./MovieGuessr.css";
import { useState, useEffect } from "react";
import { getMovieData, getRandomMovieID } from "../utils";
import type { Movie } from "../types";
import HintGrid from "./HintGrid";
import './EndGamePopup.css'
import EndGamePopup from "./EndGamePopUp";

function MovieGuessr() {
    const [data, setData] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    const [hintCount, setHintCount] = useState(0);
    const [guess, setGuess] = useState('')
    const [points, setPoints] = useState(5000);
    const [win, setWin] = useState(false);

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

    // verify guess
    const verifyGuess = () => {
        // TODO: need to check if guess is close enough to answer
        const dummyAns = "hello"
        return guess.toLowerCase() === dummyAns.toLowerCase()
    }

    // Handle form submission
    const submitGuess = (event) => {
        event.preventDefault(); 
        console.log('Form submitted:', guess);
        const isCorrect = verifyGuess();  // checks if answer is correct
        if (isCorrect || points == 0) {
            console.log("End game");
            setShowPopUp(true)

            if (isCorrect) {
                setWin(true)
            }
        } else {
            setHintCount((hintCount) => hintCount + 1);
            setPoints((points) => points - 1000);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    } else if (data) {
        return (
            <div>
                <h1>MovieGuessr</h1>

                <h2>Hints used: {hintCount}</h2>

                <h2>Points: {points}</h2>

                <HintGrid hintCount={hintCount} movieData={data} />
                <form>
                    <input type="text" value={guess} onChange={handleChange} />
                    <button type="submit" onClick={submitGuess}>
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
