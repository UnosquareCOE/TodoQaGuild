const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTodoStatuses(req, res) {
  const todoStatuses = await prisma.todo_statuses.findMany({});
  res.status(200).json(todoStatuses);
}

module.exports = {
  getTodoStatuses,
};
