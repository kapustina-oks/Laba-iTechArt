export interface dataItems {
  name: string;
  id: number;
  img: string;
  rating: number;
  price: string;
  category: string;
  date: Date;
}

const getResource = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not fetch /api/games, status: ${res.status}`);
  }

  const res2 = await res.json();
  return res2;
};

function _transformGames(game: dataItems) {
  return {
    name: game.name,
    id: game.id,
    img: game.img,
    rating: game.rating,
    price: game.price,
    category: game.category,
    date: game.date,
  };
}

export const getAllGames = async () => {
  const res = await getResource("/api/games");
  return res.map(_transformGames);
};
