import "./EndGamePopUp.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenreName, getPlaceString, saveScore } from "../utils";

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
                {!place && (
                    <>
                        <label className="username-label" htmlFor="username">
                            Enter a username to save your score:
                        </label>
                        <input
                            className="username-input"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            maxLength={50}
                        ></input>
                        {error && (
                            <p className="popup-text popup-error">{error}</p>
                        )}
                        <button
                            className="popup-button"
                            onClick={handleSaveClick}
                        >
                            {saving ? "Saving..." : "Save Score"}
                        </button>
                    </>
                )}

                {place && (
                    <p className="popup-text">
                        You placed {getPlaceString(place)} on the{" "}
                        {getGenreName(genre)} leaderboard.
                    </p>
                )}
				<button className="popup-button" onClick={() => navigate(`/Leaderboards?genre=${genre}`)}>View Leaderboard</button>
                <button className="popup-button" onClick={handleButtonClick}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default EndGamePopUp;
