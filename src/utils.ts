import {
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
} from "firebase/firestore";
import type { LeaderboardDateRange, LeaderboardScore, Movie } from "./types";
import { db } from "./firebaseConfig";

export const obscureTitle = (title: string) => {
    return title.replace(/[a-zA-Z0-9]/g, "_");
};

export const getMovieData = async (
    genre: string,
    genreID: number
): Promise<Movie> => {
    const pageNum = Math.floor(Math.random() * 4) + 1;
    console.log("genre name:", genre);

    // fetch popular movies
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=1000&with_origin_country=US${genreID === 0 ? "" : "&with_genres=" + genreID}&api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`,
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

export const genres = [
    {
        id: 0,
        name: "Any Category",
    },
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

export const getGenreName = (genreID: number) => {
    return genres.find((genre) => genre.id === genreID)?.name || "";
};

export interface ScoreResult {
    error?: string;
    place?: number;
}

export const saveScore = async (
    username: string,
    score: number,
    genre: number
): Promise<ScoreResult> => {
    const docRef = doc(db, `leaderboards/${genre}/leaderboard/${username}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            error: "That username is already taken on this leaderboard.",
        };
    }

    await setDoc(docRef, {
        score: score,
        time: serverTimestamp(),
    });

    const q = query(
        collection(db, `leaderboards/${genre}/leaderboard`),
        where("score", ">=", score)
    );

    const placeSnap = await getCountFromServer(q);

    return {
        place: placeSnap.data().count,
    };
};

export const getPlaceString = (place: number) => {
    if ((place - 1) % 10 === 0) {
        return place + "st";
    } else if ((place - 2) % 10 === 0) {
        return place + "nd";
    } else if ((place - 3) % 10 === 0) {
        return place + "rd";
    } else {
        return place + "th";
    }
};

const getDayStart = () => {
    const result = new Date();
    result.setHours(0, 0, 0, 0);
    return result;
};

const getMonthStart = () => {
    const result = new Date();
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
};

export const getLeaderboard = async (
    genre: number,
    dateRange: LeaderboardDateRange
): Promise<LeaderboardScore[]> => {
    const q =
        dateRange === "all"
            ? query(
                  collection(db, `leaderboards/${genre}/leaderboard`),
                  orderBy("score", "desc")
              )
            : dateRange === "day"
              ? query(
                    collection(db, `leaderboards/${genre}/leaderboard`),
                    orderBy("score", "desc"),
                    where("time", ">=", Timestamp.fromDate(getDayStart()))
                )
              : query(
                    collection(db, `leaderboards/${genre}/leaderboard`),
                    orderBy("score", "desc"),
                    where("time", ">=", Timestamp.fromDate(getMonthStart()))
                );

    const snap = await getDocs(q);

    let i = 0;
    const leaderboard = snap.docs.map((doc) => {
        const data = doc.data();
        i++;
        return {
            username: doc.id,
            score: data.score,
            position: i,
        };
    });

    return leaderboard;
};
