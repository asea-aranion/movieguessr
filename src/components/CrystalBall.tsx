import crystalBall from "../assets/animated-crystal-ball.png"
import './CrystallBall.css'

function CrystalBall({ prophecy }: { prophecy: string }) {
    return (
        <>
            <div className="prophecy-container">
                <p>
                    {prophecy.toLowerCase() === "true"
                        ? "You got the movie!"
                        : prophecy}
                </p>
                <img className="crystalball-img" src={crystalBall} />
            </div>
        </>
    );
}

export default CrystalBall;
