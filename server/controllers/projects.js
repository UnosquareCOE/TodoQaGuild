const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProjects(req, res) {
  const projects = await prisma.projects.findMany({
    select: {
      id: true,
      name: true,
      key: true,
    },
  });

  if (projects && projects.length > 0) {
    res.status(200).json(projects);
  } else {
    res.sendStatus(204);
  }
}

async function getProject(req, res) {
  const { projectId } = req.params;
  const project = await prisma.projects.findUnique({
    where: {
      id: parseInt(projectId),
    },
  });

  if (project) {
    res.status(200).json(project);
  } else {
    res.sendStatus(204);
  }
}

async function createProject(req, res) {
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

async function updateProject(req, res) {
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

async function deleteProject(req, res) {
  const { projectId } = req.params;
  await prisma.projects.delete({
    where: {
      id: parseInt(projectId),
    },
  });

  res.sendStatus(204);
}

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
