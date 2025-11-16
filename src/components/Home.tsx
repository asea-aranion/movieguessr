import "./Home.css";
import { useState } from "react";
import DropDown from "./DropDown";
import { genres } from "../utils";
import { Link, createSearchParams } from "react-router-dom";

export function Home() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [selectGenreId, setSelectGenreId] = useState(0);
    const [selectGenreName, setSelectGenreName] = useState("Any Category");

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
                <h1>Welcome to MovieGuessr!</h1>
                <p className="category-direction">
                    Choose a category to compete in:
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
                    Start playing!
                </Link>
            </div>
        </>
    );
}

export default Home;
