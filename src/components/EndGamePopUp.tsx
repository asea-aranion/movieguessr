import "./EndRoundPopUp.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EndGamePopUp({ points }: { points: number }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    };
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="overlay">
            <div className="popup-content">
                <h2 className="popup-title">Game end!</h2>
                <p className="popup-text">You scored {points} total points.</p>
                <button
                    className="play-again-button"
                    onClick={handleButtonClick}
                >
                    Play again?
                </button>
            </div>
        </div>
    );
}

export default EndGamePopUp;
