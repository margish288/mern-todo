import userRoute from "./user.route.js";
import taskRoute from "./task.route.js";

export const setupRoute = (app) => {
  // @route GET /api/test
  app.get("/api/test", (_, res) => {
    res.send("Setup api!");
  });

  app.use("/api/user", userRoute);
  app.use("/api/task", taskRoute);
};
