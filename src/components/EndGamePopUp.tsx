import "./EndGamePopUp.css";
import { useNavigate } from "react-router-dom";

function EndGamePopup({ win, imgPath, title }: { win: boolean, imgPath: string, title: string }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    };

    const imgSource = `https://image.tmdb.org/t/p/w200${imgPath}`

    return (
        <div className="overlay">
            <div className="popup-content">
                <h2>
                    { win ? "Congratulations!" : "Better luck next time :(" }
                </h2>
                <img src={imgSource} />
                <p>{title}</p>
                <button onClick={handleButtonClick}>Play again?</button>
            </div>
        </div>
    );
}

export default EndGamePopup;
