const express = require("express");

const server = express();
server.use(express.json());

let countRequest = 0;
const projects = [
  {
    id: "0",
    title: "Novo projeto",
    tasks: ["Nova tarefa 1", "Nova tarefa 2"]
  },
  {
    id: "1",
    title: "Novo projeto 2",
    tasks: ["Nova tarefa 1", "Nova tarefa 2"]
  }
];

// server.users((req, res, next) => {
//   console.time("Request");

//   console.log("Hello World");

//   next();
//   console.timeEnd("Request");
// });
function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (id >= 0 && id < projects.length) {
    return next();
  }

  return res.status(400).json({ error: "Id out of range" });
}

server.use((req, res, next) => {
  console.time("Request");

  countRequest++;
  console.log(countRequest);
  next();
  console.timeEnd("Request");
});

//listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { tasks } = req.body;

  // if (id < 0 && id > projects.length){
  //   return
  // }

  if (title !== undefined) {
    projects[id].title = title;
  }

  // if (tasks !== undefined) {
  //   projects[id].tasks = tasks;
  // }

  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;

  projects.push({
    id: id,
    title: title,
    tasks: tasks
  });

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (title !== undefined) {
    projects[id].tasks.push(title);
  }

  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.listen("3000");
