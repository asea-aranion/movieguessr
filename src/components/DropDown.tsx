import { useState, useEffect } from "react";
import "./DropDown.css"; // For styling

const Dropdown = ({
    options,
    setGenreId,
    setGenreName,
}: {
    options: { id: number; name: string }[];
    setGenreId: React.Dispatch<React.SetStateAction<number>>;
    setGenreName: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const onClickHandler = (id: number, name: string): void => {
        setGenreId(id);
        setGenreName(name);
    };

    useEffect(() => {
        setShowDropDown(showDropDown);
    }, [showDropDown]);

    return (
        <>
            <div className={showDropDown ? "dropdown" : "dropdown active"}>
                {options.map((genre, index: number) => {
                    return (
                        <p
                            key={index}
                            onClick={(): void => {
                                onClickHandler(genre.id, genre.name);
                            }}
                        >
                            {genre.name}
                        </p>
                    );
                })}
            </div>
        </>
    );
};

export default Dropdown;
