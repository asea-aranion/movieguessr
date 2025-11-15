import './MovieGuessr.css'
import React, { useState, useEffect } from 'react';

function MovieGuessr() {

    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    const baseURL = "https://api.themoviedb.org/3/discover/movie"

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(baseURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${apiKey}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            setData(json);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [apiKey]);

    return (
        <div>
            <h1>MovieGuessr</h1>
            <p></p>
        </div>
    )
}

export default MovieGuessr;

