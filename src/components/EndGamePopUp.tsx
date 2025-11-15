import React from "react";

function EndGamePopup({ win }: { win: boolean }) {
    return (
        <div className="overlay">
            <div className="popup-content">
                <h2>
                    {" "}
                    {win ? "Congratulations!" : "Better luck next time :("}{" "}
                </h2>
                <button>Play again?</button>
            </div>
        </div>
    );
}

export default EndGamePopup;
