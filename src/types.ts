export interface Movie {
    tmdbID: number;
    title: string;
    actors: string[];
    director: string;
    releaseYear: number;
    plotOverview: string;
    posterPath: string;
}

export interface LeaderboardScore {
    username: string;
    score: number;
    position: number;
}
