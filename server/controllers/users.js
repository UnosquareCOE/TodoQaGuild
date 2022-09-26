const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers(req, res) {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function getUser(req, res) {
  const { userId } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  res.sendStatus(201);
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  await prisma.users.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  res.sendStatus(201);
}

async function deleteUser(req, res) {
  const { userId } = req.params;
  prisma.users.delete({
    where: {
      id: parseInt(userId),
    },
  });

  res.sendStatus(204);
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
