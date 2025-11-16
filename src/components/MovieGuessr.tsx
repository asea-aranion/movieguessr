import "./MovieGuessr.css";
import { useState } from "react";
import type { Movie } from "../types";
import HintGrid from "./HintGrid";
import EndRoundPopUp from "./EndRoundPopUp";
import CrystalBall from "./CrystalBall";
import { getProphecy } from "../utils";

interface MovieGuessrProps {
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
    roundNum: number;
    setRoundNum: React.Dispatch<React.SetStateAction<number>>;
    data: Movie;
    genreID: number;
}

function MovieGuessr({
    setTotalPoints,
    roundNum,
    setRoundNum,
    data,
    genreID,
}: MovieGuessrProps) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [prophecy, setProphecy] = useState("");
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
    const verifyGuess = async () => {
        if (guess.trim().toLowerCase() === data?.title.toLowerCase()) {
            return true;
        } else if (hintCount < 2) {
            return false;
        }

        const prompt = `This is a user's guess, ${guess}, and the actual movie is ${data.title}.
						If this: "${guess}" is "",
						return ONLY a small, not too easy, one-sentence hint towards the actual movie title, WITHOUT saying "You are not close.", and disregard the rest of this prompt.
						For our purposes, "close" means if their guess is missing punctuation or missing
                        a subtitle, or has a misspelled word. 
                        If they're close to the actual title, return ONLY the string "true" and disregard the rest of this prompt. 
                        If they're not close, say something like "You are not close.", then give them a small, not too easy, one-sentence hint to 
                        guide them in the right direction. Be honest with how close they are to the 
                        actual movie title. Do not hallucinate hints, and be
                        as accurate as possible. Do not give them the movie title if they
                        are not close, and address the user directly.`;

        try {
            const response = await getProphecy(prompt);

            if (response === "true") {
                return true;
            } else {
                setProphecy(response);
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    // Handle form submission
    const submitGuess = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const isCorrect = await verifyGuess();
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
                <h1 className={genreID === 27 ? "spooky-title" : ""}>
                    MovieGuessr
                </h1>

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

                <div className="crystal-ball-container">
                    <CrystalBall prophecy={prophecy} />
                </div>
            </div>
        );
    }
}

export default MovieGuessr;
