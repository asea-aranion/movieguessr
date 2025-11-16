import { useEffect, useState } from "react";
import "./LeaderboardsPage.css";
import type { LeaderboardScore, LeaderboardDateRange } from "../types";
import { genres, getGenreName, getLeaderboard, getPlaceString } from "../utils";
import DropDown from "./DropDown";
import { Link, useSearchParams } from "react-router-dom";

const LeaderboardsPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dateRange, _] = useState<LeaderboardDateRange>("all");
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const paramsResult = useSearchParams();
    const [genre, setGenre] = useState(
        Number(paramsResult[0].get("genre") || 0)
    );
    const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);

    const dismissHandler = (
        event: React.FocusEvent<HTMLButtonElement>
    ): void => {
        if (event.currentTarget === event.target) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getLeaderboard(genre, dateRange).then((data) => {
            setLeaderboard(data);
            setLoading(false);
        });
    }, [genre, dateRange]);

    return (
        <div className="leaderboards-cont">
            <h1>Leaderboards</h1>
            <button
                className={
                    showDropdown
                        ? "menu active leaderboard-dropdown"
                        : "menu leaderboard-dropdown"
                }
                onClick={() => setShowDropdown((value) => !value)}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
                <div>
                    {genres.find((element) => element.id === genre)?.name || ""}
                </div>
                {showDropdown && (
                    <DropDown
                        options={genres}
                        setGenreId={setGenre}
                        setGenreName={() => {}}
                    />
                )}
            </button>
            {loading ? (
                <p className="leaderboard-text">Loading...</p>
            ) : leaderboard.length === 0 ? (<>
                <p className="leaderboard-text">No scores yet.</p>
				<Link to={`/MovieGuessr/?genre_id=${genre}&genre_name=${getGenreName(genre)}`}>Be the first!</Link>
				</>
            ) : (
                leaderboard.map((score) => (
                    <div
                        className="leaderboard-card"
                        style={{
                            animationDelay: (score.position - 1) * 0.1 + "s",
                        }}
                    >
                        <p className="card-text leaderboard-position">
                            {getPlaceString(score.position)}
                        </p>
                        <p className="card-text">{score.username}</p>
                        <p className="card-text">{score.score}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default LeaderboardsPage;
