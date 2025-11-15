import type { Movie } from "../types";
import { obscureTitle } from "../utils";
import "./HintGrid.css";

interface HintGridProps {
    hintCount: number;
    movieData: Movie;
}

function HintGrid({ hintCount, movieData }: HintGridProps) {
    return (
        <div>
            <div className="hint-grid">
                {hintCount >= 1 && (
                    <div className="hint">
                        <h4 className="hint-heading">Actors</h4>
                        <p className="hint-text">
                            {movieData.actors.join(", ")}
                        </p>
                    </div>
                )}
                {hintCount >= 2 && (
                    <div className="hint">
                        <h4 className="hint-heading">Release Year</h4>
                        <p className="hint-text">{movieData.releaseYear}</p>
                    </div>
                )}
                {hintCount >= 3 && (
                    <div className="hint">
                        <h4 className="hint-heading">Director</h4>
                        <p className="hint-text">{movieData.director}</p>
                    </div>
                )}
                {hintCount >= 4 && (
                    <div className="hint">
                        <h4 className="hint-heading">Title Hangman</h4>
                        <p className="hint-text">
                            {obscureTitle(movieData.title)}
                        </p>
                    </div>
                )}
                {hintCount >= 5 && (
                    <div className="hint">
                        <h4 className="hint-heading">Plot Summary</h4>
                        <p className="hint-text">{movieData.plotOverview}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HintGrid;
