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

export const postResource = async (url: string, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Could not fetch url: ${url}, status: ${res.status}`);
  }
  return res;
};

export const putResource = async (url: string, body) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Could not fetch url: ${url}, status: ${res.status}`);
  }
  return res;
};
