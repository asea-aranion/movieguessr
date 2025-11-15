const movieIDs = [
  "tt1312221", // frankenstein
  "tt31227572", // predator: badlands
  "tt10676052", // f4
  "tt14205554", // kpop demon hunters
];

export const getRandomMovieID = () => {
  const randomIndex = Math.floor(Math.random() * movieIDs.length);

  return movieIDs[randomIndex];
};
