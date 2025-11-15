import type { Movie } from "./types";

export const obscureTitle = (title: string) => {
    return title.replace(/[a-zA-Z0-9]/g, "_");
};

export const getMovieData = async (): Promise<Movie> => {
    const pageNum = Math.floor(Math.random() * 4) + 1;

    // fetch popular movies
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=1000&with_origin_country=US&api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error("failed to fetch movies");
    }

    // pick random movie
    const json = await response.json();
    const numResults = json.results.length;
    const movie = json.results[Math.floor(Math.random() * numResults)];

    const tmdbID = movie.id;
    const title = movie.title;
    const plotOverview = movie.overview;
    const releaseYear = movie.release_date.substring(0, 4);
    const posterPath = movie.poster_path;

    const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbID}/credits?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error("failed to fetch movie credits for ID " + tmdbID);
    }

    const creditsJson = await creditsResponse.json();

    const actors = creditsJson.cast
        .slice(0, 5)
        .map((member: { name: string }) => member.name);
    const director = creditsJson.crew.find(
        (member: { job: string }) => member.job === "Director"
    ).name;

    return {
        tmdbID,
        title,
        plotOverview,
        releaseYear,
        actors,
        director,
        posterPath,
    };
};
