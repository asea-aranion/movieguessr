import "./Home.css";
import { useState } from "react";
import DropDown from "./DropDown";
import { genres } from "../utils";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

export function Home() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [selectGenreId, setSelectGenreId] = useState(0);
    const [selectGenreName, setSelectGenreName] = useState("Any Genre");

    const navigate = useNavigate();

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const dismissHandler = (
        event: React.FocusEvent<HTMLButtonElement>
    ): void => {
        if (event.currentTarget === event.target) {
            setShowDropDown(false);
        }
    };

    return (
        <>
            <div className="home-body-container">
                <h1 className="home-title">Welcome to MovieGuessr!</h1>
                <p className="category-direction">
                    Choose a genre to compete in:
                </p>
                <button
                    className={showDropDown ? "menu active" : "menu"}
                    onClick={(): void => toggleDropDown()}
                    onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                        dismissHandler(e)
                    }
                >
                    <div>{selectGenreName}</div>
                    {showDropDown && (
                        <DropDown
                            options={genres}
                            setGenreId={setSelectGenreId}
                            setGenreName={setSelectGenreName}
                        />
                    )}
                </button>
                <Link
                    to={{
                        pathname: "/MovieGuessr",
                        search: `?${createSearchParams({ genre_name: selectGenreName.toLowerCase(), genre_id: String(selectGenreId) })}`,
                    }}
                >
                    Play MovieGuessr!
                </Link>
                <hr></hr>
                <button
                    className="home-button"
                    onClick={() => navigate("/Leaderboards")}
                >
                    View Leaderboards
                </button>
            </div>
        </>
    );
}

export default Home;
