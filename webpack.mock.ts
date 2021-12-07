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
      console.log(gamesList);
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
      gamesList = gamesList.filter((game) =>
        game.genres.toLowerCase().includes((filterGenre as string).trim().toLowerCase())
      );
    }
    if (_req.query.age) {
      const filterAge = _req.query.age;
      gamesList = gamesList.filter((game) => game.age.toLowerCase().includes((filterAge as string).trim().toLowerCase()));
    }
    if (_req.query.rating) {
      const sortRating = _req.query.rating;
      if (sortRating === "ascending") {
        gamesList = gamesList.sort((prev, next) => prev.rating - next.rating);
      } else {
        gamesList = gamesList.sort((prev, next) => next.rating - prev.rating);
      }
    }
    if (_req.query.price) {
      const sortPrice = _req.query.price;
      if (sortPrice === "ascending") {
        gamesList = gamesList.sort((prev, next) => parseInt(prev.price, 10) - parseInt(next.price, 10));
      } else {
        gamesList = gamesList.sort((prev, next) => parseInt(next.price, 10) - parseInt(prev.price, 10));
      }
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
    console.log(req.body);
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
