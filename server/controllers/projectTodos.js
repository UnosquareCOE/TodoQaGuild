const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProjectTodos(req, res) {
  const { projectId } = req.params;
  const todos = await prisma.todos.findMany({
    where: {
      project_id: parseInt(projectId),
    },
    select: {
      id: true,
      summary: true,
      todo_status_id: true,
    },
  });

  if (todos && todos.length > 0) {
    res.status(200).json(todos);
  } else {
    res.sendStatus(204);
  }
}

async function getProjectTodo(req, res) {
  const { todoId } = req.params;
  const todo = await prisma.todos.findUnique({
    where: {
      id: parseInt(todoId),
    },
  });

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.sendStatus(204);
  }
}

async function createProjectTodo(req, res) {
  const { name, description, key } = req.body;
  await prisma.projects.create({
    data: {
      name: name,
      description: description,
      key: key,
    },
  });

  res.sendStatus(201);
}

async function updateProjectTodo(req, res) {
  const { projectId } = req.params;
  const { name, description, key } = req.body;
  await prisma.projects.update({
    where: {
      id: parseInt(projectId),
    },
    data: {
      name: name,
      description: description,
      key: key,
    },
  });

  res.sendStatus(201);
}

async function deleteProjectTodo(req, res) {
  const { todoId } = req.params;
  prisma.todos.delete({
    where: {
      id: parseInt(todoId),
    },
  });

  res.sendStatus(204);
}

module.exports = {
  getAllProjectTodos,
  getProjectTodo,
  createProjectTodo,
  updateProjectTodo,
  deleteProjectTodo,
};
