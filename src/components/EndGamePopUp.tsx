import React from 'react'



function EndGamePopup( win: boolean ) {

    return (
        <div className='overlay'>
            <div className="popup-content">
                <h2> {win ? (
                    "Congratulations!"
                ):(
                    "Better luck next time :("
                )} </h2>
            </div>
        </div>
    )
}

export default EndGamePopup;