import animatedGhost from '../assets/animated-ghost.png'

function CrystalBall({ prophecy }: { prophecy: string }) {
    return (
        <>
            <div className="prophecy-container">
                <p>
                    {prophecy.toLowerCase() === "true"
                        ? "You got the movie!"
                        : prophecy}
                </p>
                <img src={animatedGhost} />
            </div>
        </>
    );
}

export default CrystalBall;
