function CrystalBall({ prophecy }: { prophecy: string }) {
    return (
        <>
            <div className="prophecy-container">
                <p>
                    {prophecy.toLowerCase() === "true"
                        ? "You got the movie!"
                        : prophecy}
                </p>
            </div>
        </>
    );
}

export default CrystalBall;
