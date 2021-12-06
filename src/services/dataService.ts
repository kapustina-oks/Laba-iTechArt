import { IUsersRegistration, IUsersAuthorisation } from "@/types/types";

export const getResource = async (url: string): Promise<[]> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not fetch /api/games, status: ${res.status}`);
  }

  return res.json();
};

export const getFilter = async (url: string): Promise<[]> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not fetch /api/games, status: ${res.status}`);
  }

  return res.json();
};

export const usersAuthorisation: (url: string, body: IUsersAuthorisation) => Promise<Response> = async (url, body) => {
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

export const usersRegistration: (url: string, body: IUsersRegistration) => Promise<Response> = async (url, body) => {
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
