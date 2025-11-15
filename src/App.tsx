import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieGuessrWrapper from "./components/MovieGuessrWrapper";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MovieGuessr" element={<MovieGuessrWrapper />} />
        </Routes>
    );
}

export default App;
