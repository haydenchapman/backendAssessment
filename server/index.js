const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller')
const {getFortune} = require('./controller');
//fortune destruc
const {addFortune} = require('./controller')
const {updateFortune} = require('./controller')
const {deleteFortune} = require('./controller'
)


//todolist
let todoListArr = [];
let id = 1;
app.post("/api/todo", (req, res) => {
  const { task } = req.body;
  let newTask = {
    id,
    task,
  };

  todoListArr.push(newTask);
  id++;
  res.status(200).send(todoListArr);
});

app.delete("/api/todo/:id", (req, res) => {
  const toDeleteId = +req.params.id;
  const targetIndex = todoListArr.findIndex((taskObj) => {
    return taskObj.id === toDeleteId;
  });

  const deleting = todoListArr.splice(targetIndex, 1);
  res.status(200).send([deleting[0]+2, todoListArr]);
});

app.put("/api/todo/:id", (req, res) => {
  const { id, task } = req.body;
  let targetId = Number(req.body.id);
  for (let i = 0; i < todoListArr.length; i++) {
    if (todoListArr[i].id === targetId) {
      todoListArr[i].task = task;
    }
  }
  res.status(200).send(todoListArr);
});

//doge!
app.get("https://dog.ceo/api/breeds/image/random", (req, res) => {
  const { message, status } = req.body;
  res.send(message);
});

app.get("/api/compliment", getCompliment);
app.get('/api/fortune', getFortune);
app.put('/api/fortune', updateFortune);
app.delete('/api/fortune', deleteFortune);

app.listen(4000, () => console.log("Docked at Port: 4000"));
