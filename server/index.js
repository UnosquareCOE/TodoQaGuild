const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { projectsRouter, todosRouter, usersRouter } = require("./routers");

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("tiny"));
app.use(urlencoded({ extended: true }));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todos API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.js"],
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/api-docs", (req, res) => res.json(openapiSpecification).status(200));

app.use("/projects/:projectId(\\d+)/todos", todosRouter);
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

app.listen(3000);
