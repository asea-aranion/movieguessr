import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieGuessrWrapper from "./components/MovieGuessrWrapper";
import LeaderboardsPage from "./components/LeaderboardsPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MovieGuessr" element={<MovieGuessrWrapper />} />
            <Route
                path="/Leaderboards"
                element={<LeaderboardsPage></LeaderboardsPage>}
            ></Route>
        </Routes>
    );
}

export default App;
