const express = require("express");
const { projectsRouter, todosRouter, usersRouter } = require("./routers");

const app = express();

app.use("/projects/:projectId(\\d+)/todos", todosRouter);
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

app.listen(3000);
