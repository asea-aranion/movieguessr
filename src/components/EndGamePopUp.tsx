import "./EndRoundPopUp.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveScore } from "../utils";

function EndGamePopUp({ points, genre }: { points: number; genre: number }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [saving, setSaving] = useState(false);
    const [place, setPlace] = useState<number | null>(null);
    const [error, setError] = useState("");

    const handleButtonClick = () => {
        navigate("/");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleSaveClick = async () => {
        setSaving(true);

        const result = await saveScore(username, points, genre);
        if (result.place) {
            setPlace(result.place);
        } else if (result.error) {
            setError(result.error);
        }

        setSaving(false);
    };

    return (
        <div className="overlay">
            <div className="popup-content">
                <h2 className="popup-title">Game end!</h2>
                <p className="popup-text">You scored {points} total points.</p>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                ></input>
                <p className="popup-text popup-error">{error}</p>
                <button onClick={handleSaveClick}>
                    {saving ? "Saving..." : "Save Score"}
                </button>
                {place && (
                    <p className="popup-text">You earned place {place}.</p>
                )}
                <button
                    className="play-again-button"
                    onClick={handleButtonClick}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default EndGamePopUp;
