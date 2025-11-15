import "./Home.css";
import { use, useState } from 'react';
import DropDown from "./DropDown";
import { getGenres } from "../utils";
import { Link } from "react-router-dom";

export function Home() {

    const [showDropDown, setShowDropDown] = useState(false);
    const [selectGenreId, setSelectGenreId] = useState(0);
    const [selectGenreName, setSelectGenreName] = useState("");
    const listOfGenres = getGenres();

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropDown(false);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <div className="home-body-container">
                <button
                    className={showDropDown ? "active" : undefined}
                    onClick={(): void => toggleDropDown()}
                    onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                        dismissHandler(e)
                    }
                >
                    <div>{selectGenreName ? "Select: " + selectGenreName : "Select ..."} </div>
                    {showDropDown && (
                        <DropDown
                            options={listOfGenres}
                            setGenreId={setSelectGenreId}
                            setGenreName={setSelectGenreName}
                        />
                    )}
                </button>
                <Link to="/MovieGuessr">Start playing!</Link>
            </div>
        </div>
    );
}

export default Home;