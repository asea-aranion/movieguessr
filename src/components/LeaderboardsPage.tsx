import { useEffect, useState } from "react";
import "./LeaderboardsPage.css";
import type { LeaderboardScore, LeaderboardDateRange } from "../types";
import { genres, getLeaderboard, getPlaceString } from "../utils";
import DropDown from "./DropDown";

const LeaderboardsPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dateRange, _] = useState<LeaderboardDateRange>("all");
    const [showDropdown, setShowDropdown] = useState(false);
    const [genre, setGenre] = useState(0);
    const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);

    const dismissHandler = (
        event: React.FocusEvent<HTMLButtonElement>
    ): void => {
        if (event.currentTarget === event.target) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        getLeaderboard(genre, dateRange).then((data) => setLeaderboard(data));
        console.log(dateRange);
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
            {leaderboard.map((score) => (
                <div className="leaderboard-card">
                    <p className="card-text leaderboard-position">
                        {getPlaceString(score.position)}
                    </p>
                    <p className="card-text">{score.username}</p>
                    <p className="card-text">{score.score}</p>
                </div>
            ))}
        </div>
    );
};

export default LeaderboardsPage;
