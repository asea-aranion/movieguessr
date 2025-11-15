import "./MovieGuessr.css";
import { useState, useEffect } from "react";
import { getMovieData, getRandomMovieID } from "../utils";
import type { Movie } from "../types";
import HintGrid from "./HintGrid"

function MovieGuessr() {
    const [data, setData] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [hintCount, setHintCount] = useState(0)
    const [guess, setGuess] = useState('')
    const [points, setPoints] = useState(5000)

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
    const handleChange = (event) => {
        setGuess(event.target.content);
    };

    /**
     * @returns whether the guess matches the answer
     */
    const verifyGuess = () => {
        // TODO: need to check if guess is close enough to answer
        return guess.toLowerCase() === guess.toLowerCase()
    }

    // Handle form submission
    const submitGuess = (event) => {
        event.preventDefault(); // Prevent default browser form submission
        console.log('Form submitted:', guess);
        if (verifyGuess()) {
            console.log("Correct Guess!")
            // TODO: need to prompt into starting a new game
            
        } else {
            setHintCount(hintCount + 1)
            setPoints(points - 1000)
        }
    };

    return (
        <div>
            <h1>MovieGuessr</h1>
            <HintGrid />
            <p>Points: {points}</p>
            <p>Hint Count: {hintCount}</p>
            <form>
                <input
                    type="text"
                    value={guess}
                    onChange={handleChange}
                />
                <button type="submit" onClick={submitGuess}>Submit Guess</button>
            </form>
        </div>
    );
}

export default MovieGuessr;
