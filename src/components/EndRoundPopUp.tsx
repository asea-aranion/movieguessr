import "./EndRoundPopUp.css";
import { useEffect } from "react";

function EndRoundPopUp({
    win,
    imgPath,
    title,
    hintCount,
    points,
    handleClick,
}: {
    win: boolean;
    imgPath: string;
    title: string;
    hintCount: number;
    points: number;
    handleClick: () => void;
}) {
    const imgSource = `https://image.tmdb.org/t/p/w200${imgPath}`;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="overlay">
            <div className="popup-content">
                <h2 className="popup-title">
                    {win ? "Congratulations!" : "Better luck next time :("}
                </h2>
                <p className="popup-text">
                    You scored {points} points and used {hintCount}{" "}
                    {hintCount === 1 ? "hint" : "hints"}.
                </p>
                <img src={imgSource} />
                <p className="popup-text">
                    {win ? "You guessed: " : "The answer was: "} {title}
                </p>
                <button className="play-again-button" onClick={handleClick}>
                    Next Round
                </button>
            </div>
        </div>
    );
}

export default EndRoundPopUp;
