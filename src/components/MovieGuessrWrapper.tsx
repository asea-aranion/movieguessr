import { useEffect, useState } from "react";
import { getMovieData } from "../utils";
import MovieGuessr from "./MovieGuessr";
import EndGamePopUp from "./EndGamePopUp";
import type { Movie } from "../types";

const MovieGuessrWrapper = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [roundNum, setRoundNum] = useState(1);
    const [showingPopUp, setShowingPopUp] = useState(false);
    const [data, setData] = useState<Movie | null>(null);

    useEffect(() => {}, [roundNum]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(null);

        if (roundNum > 5) {
            setShowingPopUp(true);
            return;
        }

        getMovieData()
            .then((movie) => {
                setData(movie);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [roundNum]);

    return (
        <>
            {showingPopUp && <EndGamePopUp points={totalPoints}></EndGamePopUp>}
            {data && (
                <MovieGuessr
                    setTotalPoints={setTotalPoints}
                    roundNum={roundNum}
                    setRoundNum={setRoundNum}
                    data={data}
                ></MovieGuessr>
            )}
        </>
    );
};

export default MovieGuessrWrapper;
