import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/MovieGuessr">Play MovieGuessr!</Link>
        </div>
    );
}

export default Home;
