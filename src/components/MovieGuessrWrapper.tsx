import { useEffect, useState, useRef } from "react";
import { getMovieData } from "../utils";
import MovieGuessr from "./MovieGuessr";
import EndGamePopUp from "./EndGamePopUp";
import type { Movie } from "../types";

const MovieGuessrWrapper = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [roundNum, setRoundNum] = useState(1);
    const [showingPopUp, setShowingPopUp] = useState(false);
    const [data, setData] = useState<Movie | null>(null);
    const seenMovieIDsRef = useRef<number[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(null);

        if (roundNum > 5) {
            setShowingPopUp(true);
            return;
        }

        const fetchUniqueMovie = async () => {
            try {
                let movie: Movie | null = null;

                do {
                    movie = await getMovieData();
                    console.log(seenMovieIDsRef.current);
                } while (
                    movie &&
                    seenMovieIDsRef.current.includes(movie.tmdbID)
                );

                if (movie) {
                    seenMovieIDsRef.current.push(movie.tmdbID);
                    setData(movie);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUniqueMovie();
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
