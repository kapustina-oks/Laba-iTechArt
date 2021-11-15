// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import dataGames from "./src/mock/dataBase";

export default webpackMockServer.add((app, helper) => {
  app.get("/api/games", (_req, res) => {
    const response = dataGames;
    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
