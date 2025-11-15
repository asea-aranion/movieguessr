import React from 'react';

interface hintGridProp {
    hintCount: number;
    actorList: Array<string>;
    releaseYear: number;
    director: string;
    title: string;
    poster: string;
    plot: string
}

const data = [
    { id: 'a', content: 'Item 1' },
    { id: 'b', content: 'Item 2' },
    { id: 'c', content: 'Item 3' }
];

const gridContainer = document.querySelector('.grid-container');

data.forEach(item => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.textContent = item.content;
    gridItem.dataset.key = item.id; // Add a unique key
    gridContainer.appendChild(gridItem);
});

function HintGrid( {hintCount, actorList, releaseYear, director, title, poster, plot} : hintGridProp) {

    return (
        <div>
            <p>Grid</p>
        </div>
    )

};


export default HintGrid;