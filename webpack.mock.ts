import webpackMockServer from "webpack-mock-server";
import { categories } from "@/mock/categories";
import { dataItems, IUsers } from "@/types/types";
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
    const response = gamesList;
    res.json(response);
  });

  app.get("/api/categories", (_req, res) => {
    res.json(Object.values(categories));
  });

  const users: IUsers[] = [];

  app.post("/api/auth/signIn", (req, res) => {
    const { login } = req.body;
    const { password } = req.body;
    let userId;
    console.log(req.body);
    users.forEach((user) => {
      if (user.login === login && user.password === password) {
        userId = user.id;
        res.status(201);
      } else {
        res.status(401);
      }
    });
    res.json({ body: req.body || null, currentUserId: userId, success: true, users });
  });

  app.put("/api/auth/signUp", (req, res) => {
    users.push(req.body);
    res.json({ body: req.body || null, success: true, users });
  });

  app.post("/api/saveProfile", (req, res) => {
    users.forEach((user) => {
      if (user.id == req.body.id) {
        user.login = req.body.name;
        user.description = req.body.description;
        user.photo = req.body.photo;
      }
    });
    res.json({ body: req.body || null, success: true, users });
  });

  app.post("/api/changePassword", (req, res) => {
    users.forEach((user) => {
      if (user.id == req.body.id) {
        user.password = req.body.password;
        user.passwordRepeat = req.body.passwordRepeat;
      }
    });
    res.json({ body: req.body || null, success: true, users });
  });
});
