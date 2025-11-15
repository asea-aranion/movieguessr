import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieGuessr from "./components/MovieGuessr";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MovieGuessr" element={<MovieGuessr />} />
        </Routes>
    );
}

export default App;
