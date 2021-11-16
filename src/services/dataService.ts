export interface dataItems {
  name: string;
  id: number;
  img: string;
  rating: number;
  price: string;
  categories: string[];
  date: Date;
}

export const getResource = async (url: string) => {
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
