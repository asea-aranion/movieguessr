import "./EndGamePopUp.css";
import { useNavigate } from "react-router-dom";

function EndGamePopup({ win }: { win: boolean }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    };

    return (
        <div className="overlay">
            <div className="popup-content">
                <h2>
                    {" "}
                    {win ? "Congratulations!" : "Better luck next time :("}{" "}
                </h2>
                <button onClick={handleButtonClick}>Play again?</button>
            </div>
        </div>
    );
}

export default EndGamePopup;
