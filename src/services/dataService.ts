import { IPostData, IPutData } from "@/types/types";

export const getResource = async (url: string): Promise<[]> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not fetch /api/games, status: ${res.status}`);
  }

  return await res.json();
};

export const postResource: (url: string, body: IPutData) => Promise<Response> = async (url, body) => {
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

export const putResource: (url: string, body: IPostData) => Promise<Response> = async (url, body) => {
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
