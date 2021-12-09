import webpackMockServer from "webpack-mock-server";
import { categories } from "@/mock/categories";
import { dataItems, IUsers } from "@/types/types";
import dataGames from "./src/mock/dataBase";

interface UserDataObject {
  [key: string]: IUsers;
}

export default webpackMockServer.add((app) => {
  app.get("/api/games", (_req, res) => {
    let gamesList = [...dataGames];
    if (_req.query.filter) {
      const searchString = _req.query.filter;
      gamesList = gamesList.filter((elem) =>
        elem.name.toLowerCase().includes((searchString as string).trim().toLowerCase())
      );
    }
    console.log("filter: " + gamesList);
    if (_req.query.category) {
      const category = _req.query.category as string;
      if (category !== "undefined") {
        gamesList = gamesList.filter((item) => item.categories.includes(category));
      }
    }
    console.log("category: " + gamesList);

    if (_req.query.sortBy) {
      const { sortBy } = _req.query;
      if (sortBy === "date") {
        gamesList.sort((a: dataItems, b: dataItems) => b.date.valueOf() - a.date.valueOf());
      }
    }
    if (_req.query.limit) {
      const limit = +_req.query.limit;
      if (gamesList.length > limit) {
        gamesList = gamesList.slice(0, limit);
      }
    }
    if (_req.query.genre) {
      const filterGenre = _req.query.genre;
      if (filterGenre !== "all") {
        gamesList = gamesList.filter((game) => game.genres.toLowerCase() === (filterGenre as string).toLowerCase());
      }
    }
    console.log("genre: " + gamesList);
    if (_req.query.age) {
      const filterAge = _req.query.age;
      if (filterAge !== "all")
        gamesList = gamesList.filter((game) =>
          game.age.toLowerCase().includes((filterAge as string).trim().toLowerCase())
        );
    }
    console.log("after age: " + gamesList);
    if (_req.query.sort) {
      const direction = _req.query.direction || "ascending";
      gamesList = gamesList.sort((prev: dataItems, next: dataItems) => {
        const sortField = _req.query.sort as keyof dataItems;

        const priceOrRatingFromPrev = prev[sortField];
        const priceOrRatingFromNext = next[sortField];

        if (direction === "ascending") {
          return priceOrRatingFromPrev > priceOrRatingFromNext ? -1 : 1;
        }
        return priceOrRatingFromPrev > priceOrRatingFromNext ? 1 : -1;
      });
    }
    const response = gamesList;
    res.json(response);
    console.log("last: " + gamesList);
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
