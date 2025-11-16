import { useEffect, useState } from "react";
import "./LeaderboardsPage.css";
import type { LeaderboardScore, LeaderboardDateRange } from "../types";
import { getLeaderboard } from "../utils";

const LeaderboardsPage = () => {
    const [dateRange, setDateRange] = useState<LeaderboardDateRange>("all");
    const [genre, setGenre] = useState(0);
    const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);

    useEffect(() => {
        getLeaderboard(genre, dateRange).then((data) => setLeaderboard(data));
    }, [genre, dateRange]);

    return (
        <div className="leaderboards-cont">
            {leaderboard.map((score) => (
                <div>
                    <p>{score.position}</p>
                    <p>{score.username}</p>
                    <p>{score.score}</p>
                </div>
            ))}
        </div>
    );
};

export default LeaderboardsPage;
