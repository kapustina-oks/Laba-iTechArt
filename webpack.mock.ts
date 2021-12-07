import webpackMockServer from "webpack-mock-server";
import { categories } from "@/mock/categories";
import { dataItems, IUsersAuthorisation, IUsersRegistration } from "@/types/types";
import dataGames from "./src/mock/dataBase";

export default webpackMockServer.add((app) => {
  app.get("/api/games", (_req, res) => {
    let gamesList = [...dataGames];
    if (_req.query.filter) {
      const searchString = _req.query.filter;
      gamesList = gamesList.filter((elem) =>
        elem.name.toLowerCase().includes((searchString as string).trim().toLowerCase())
      );
    }
    if (_req.query.category) {
      const category = _req.query.category as string;
      gamesList = gamesList.filter((item) => item.categories.includes(category));
    }
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
      if (filterGenre !== "all")
        gamesList = gamesList.filter((game) => game.genres.toLowerCase() === (filterGenre as string).toLowerCase());
    }
    if (_req.query.age) {
      const filterAge = _req.query.age;
      if (filterAge !== "all")
        gamesList = gamesList.filter((game) =>
          game.age.toLowerCase().includes((filterAge as string).trim().toLowerCase())
        );
    }

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
  });

  app.get("/api/categories", (_req, res) => {
    res.json(Object.values(categories));
  });
  const users: IUsersRegistration[] | IUsersAuthorisation[] = [];
  app.post("/api/auth/signIn", (req, res) => {
    const { login } = req.body;
    const { password } = req.body;
    users.forEach((user) => {
      if (user.login === login && user.password === password) {
        res.status(201);
      } else {
        res.status(401);
      }
    });
    res.json({ body: req.body || null, success: true, users });
  });
  app.put("/api/auth/signUp", (req, res) => {
    users.push(req.body);
    res.json({ body: req.body || null, success: true, users });
  });
});
