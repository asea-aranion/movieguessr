import type { Movie } from "./types";

export const obscureTitle = (title: string) => {
    return title.replace(/[a-zA-Z0-9]/g, "_");
};

export const getMovieData = async (): Promise<Movie> => {
    // fetch popular movies
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=1000&with_origin_country=US&api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
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
        title,
        plotOverview,
        releaseYear,
        actors,
        director,
        posterPath,
    };
};

export const getGenres = () => {
    const genres = [
        {
            id: 28,
            name: "Action"
        },
        {
            id: 12,
            name: "Adventure"
        },
        {
            id: 16,
            name: "Animation"
        },
        {
            id: 35,
            name: "Comedy"
        },
        {
            id: 80,
            name: "Crime"
        },
        {
            id: 99,
            name: "Documentary"
        },
        {
            id: 18,
            name: "Drama"
        },
        {
            id: 10751,
            name: "Family"
        },
        {
            id: 14,
            name: "Fantasy"
        },
        {
            id: 36,
            name: "History"
        },
        {
            id: 27,
            name: "Horror"
        },
        {
            id: 10402,
            name: "Music"
        },
        {
            id: 9648,
            name: "Mystery"
        },
        {
            id: 10749,
            name: "Romance"
        },
        {
            id: 878,
            name: "Science Fiction"
        },
        {
            id: 10770,
            name: "TV Movie"
        },
        {
            id: 53,
            name: "Thriller"
        },
        {
            id: 10752,
            name: "War"
        },
        {
            id: 37,
            name: "Western"
        }
    ]

    return genres;
}