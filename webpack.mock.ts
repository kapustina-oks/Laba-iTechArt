import webpackMockServer from "webpack-mock-server";
import { categories } from "@/mock/categories";
import { dataItems, IUsers } from "@/types/types";
import dataGames from "./src/mock/dataBase";

interface UserDataObject {
  [key: string]: IUsers;
}

let gamesList = [...dataGames];

export default webpackMockServer.add((app) => {
  app.get("/api/games", (_req, res) => {
    let gamesListUpdated = [...gamesList];

    if (_req.query.product) {
      const itemID = _req.query.product;
      gamesListUpdated = gamesListUpdated.filter((elem) => elem.id === +itemID);
    }

    if (_req.query.filter) {
      const searchString = _req.query.filter;
      gamesListUpdated = gamesListUpdated.filter((elem) =>
        elem.name.toLowerCase().includes((searchString as string).trim().toLowerCase())
      );
    }

    if (_req.query.category) {
      const category = _req.query.category as string;
      if (category !== "undefined") {
        gamesListUpdated = gamesListUpdated.filter((item) => item.categories.includes(category));
      }
    }

    if (_req.query.sortBy) {
      const { sortBy } = _req.query;
      if (sortBy === "date") {
        gamesListUpdated.sort((a: dataItems, b: dataItems) => b.date.valueOf() - a.date.valueOf());
      }
    }
    if (_req.query.limit) {
      const limit = +_req.query.limit;
      if (gamesListUpdated.length > limit) {
        gamesListUpdated = gamesListUpdated.slice(0, limit);
      }
    }
    if (_req.query.genre) {
      const filterGenre = _req.query.genre;
      if (filterGenre !== "all") {
        gamesListUpdated = gamesListUpdated.filter(
          (game) => game.genres.toLowerCase() === (filterGenre as string).toLowerCase()
        );
      }
    }

    if (_req.query.age) {
      const filterAge = _req.query.age;
      if (filterAge !== "all")
        gamesListUpdated = gamesListUpdated.filter((game) =>
          game.age.toLowerCase().includes((filterAge as string).trim().toLowerCase())
        );
    }

    if (_req.query.sort) {
      const direction = _req.query.direction || "ascending";
      gamesListUpdated = gamesListUpdated.sort((prev: dataItems, next: dataItems) => {
        const sortField = _req.query.sort as keyof dataItems;

        const priceOrRatingFromPrev = prev[sortField];
        const priceOrRatingFromNext = next[sortField];

        if (direction === "ascending") {
          return priceOrRatingFromPrev > priceOrRatingFromNext ? -1 : 1;
        }
        return priceOrRatingFromPrev > priceOrRatingFromNext ? 1 : -1;
      });
    }
    const response = gamesListUpdated;
    res.json(response);
  });
  app.get("/api/categories", (_req, res) => {
    res.json(Object.values(categories));
  });

  const users: UserDataObject = {};

  app.post("/api/auth/signIn", (req, res) => {
    const { login } = req.body;
    const { password } = req.body;
    let userId;
    console.log(req.body);
    const user = Object.values(users).find((data) => data.login === login);
    if (user && user.password === password) {
      res.status(201);
    } else {
      res.status(401);
    }
    res.json({ body: req.body || null, currentUserId: userId, success: true, users });
  });

  app.put("/api/auth/signUp", (req, res) => {
    const userId: string = req.body.id;
    users[userId] = req.body;
    res.json({ body: req.body || null, success: true, users });
  });

  app.post("/api/games", (req, res) => {
    console.log(req.body);
    gamesList.push(req.body);
    res.status(201);
    res.json({ body: req.body || null, success: true, users });
  });

  app.put("/api/games", (req, res) => {
    console.log(req.body);
    if (req.body.id) {
      const editGame = gamesList.find((game) => game.id === req.body.id);
      const editGameIndex = gamesList.findIndex((game) => game.id === req.body.id);
      const merged = { ...editGame, ...req.body };
      gamesList[editGameIndex] = merged;
    } else {
      res.status(400);
    }
    res.json({ body: req.body || null, success: true, users });
  });

  app.delete("/api/games/:id", (req, res) => {
    if (req.params.id) {
      gamesList = gamesList.filter((game) => game.id !== +req.params.id);
      res.status(200);
    }
    res.json({ body: req.body || null, success: true, users });
  });

  app.post("/api/saveProfile", (req, res) => {
    const { id } = req.body;
    const user = users[id];
    const newUser = {
      login: req.body.name,
      description: req.body.description,
      photo: req.body.photo,
    };
    if (user) {
      users[id] = { ...user, ...newUser };
    } else {
      res.status(404);
    }
    res.json({ body: req.body || null, success: true, users });
  });

  app.post("/api/changePassword", (req, res) => {
    const { id } = req.body;
    const user = users[id];
    const newUser = {
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat,
    };
    if (user) {
      users[id] = { ...user, ...newUser };
    } else {
      res.status(404);
    }
    res.json({ body: req.body || null, success: true, users });
  });
});
