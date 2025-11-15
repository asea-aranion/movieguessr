import "./MovieGuessr.css";
import { useState } from "react";
import type { Movie } from "../types";
import HintGrid from "./HintGrid";
import EndRoundPopUp from "./EndRoundPopUp";

interface MovieGuessrProps {
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
    roundNum: number;
    setRoundNum: React.Dispatch<React.SetStateAction<number>>;
    data: Movie;
}

function MovieGuessr({
    setTotalPoints,
    roundNum,
    setRoundNum,
    data,
}: MovieGuessrProps) {
    const [showPopUp, setShowPopUp] = useState(false);

    const [hintCount, setHintCount] = useState(1);
    const [guess, setGuess] = useState("");
    const [points, setPoints] = useState(5000);
    const [win, setWin] = useState(false);
    const [guessIsWrong, setGuessIsWrong] = useState(false);

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
        const isCorrect = verifyGuess();
		let isRoundOver = false;
		
        if (isCorrect) {
            setWin(true);
			isRoundOver = true;
        } else {
			isRoundOver = hintCount === 5;

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
            }, 600);
        }

		if (isRoundOver) {
			setShowPopUp(true);
			setWin(isCorrect);
		}
    };

    const handleEndRoundPopUpClick = () => {
        setTotalPoints((totalPoints) => totalPoints + points);
        setRoundNum((roundNum) => roundNum + 1);
    };

    if (!data) {
        return <p>Loading...</p>;
    } else {
        return (
            <div className="movieguessr-container">
                <h1>MovieGuessr</h1>

                <h2 className="round-count">Round {roundNum}</h2>

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

                {showPopUp && (
                    <EndRoundPopUp
                        win={win}
                        imgPath={data.posterPath}
                        title={data.title}
                        hintCount={hintCount}
                        points={points}
                        handleClick={handleEndRoundPopUpClick}
                    />
                )}
            </div>
        );
    }
}

export default MovieGuessr;
