import type { Movie } from "./types";

const movieIDs = [
    "tt1312221", // frankenstein
    "tt31227572", // predator: badlands
    "tt10676052", // f4
    "tt14205554", // kpop demon hunters
];

export const obscureTitle = (title: string) => {
    return title.replace(/[a-zA-Z0-9]/g, "_");
};

export const getRandomMovieID = () => {
    const randomIndex = Math.floor(Math.random() * movieIDs.length);

    return movieIDs[randomIndex];
};

export const getMovieData = async (id: string): Promise<Movie> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id&api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error("failed to fetch movie with IMDB ID " + id);
    }

    const json = await response.json();
    const movie = json.movie_results[0];

    if (!movie) {
        throw new Error("no results for movie with IMDB ID " + id);
    }

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
        title,
        plotOverview,
        releaseYear,
        actors,
        director,
        posterPath,
    };
};
