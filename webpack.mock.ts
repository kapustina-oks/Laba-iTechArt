// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import dataGames from "./src/mock/dataBase";
import {dataItems} from "./src/services/dataService";

export default webpackMockServer.add((app, helper) => {
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
      gamesList = gamesList.filter((elem) => elem.categories.includes(category));
    }
    if (_req.query.sortBy) {
      const { sortBy } = _req.query;
      if (sortBy === "date") {
        gamesList.sort((a: dataItems, b: dataItems) => b.date.valueOf() - a.date.valueOf());
      }
    }
    const response = gamesList;
    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
