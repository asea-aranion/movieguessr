function CrystalBall({ prophecy }: { prophecy: string }) {
    return (
        <>
            <div className="prophecy-container">
                <p>
                    {prophecy.toLowerCase() === "true"
                        ? "You got the movie!"
                        : prophecy}
                </p>
                <img src="../" />
            </div>
        </>
    );
}

export default CrystalBall;
