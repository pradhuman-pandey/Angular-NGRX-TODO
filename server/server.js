// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Todo Model
// const Todo = mongoose.model('Todo', new mongoose.Schema({
//   title: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// }));

// // Routes
// app.get('/todos', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post('/todos', async (req, res) => {
//   const todo = new Todo(req.body);
//   await todo.save();
//   res.status(201).json(todo);
// });

// app.put('/todos/:id', async (req, res) => {
//   const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(todo);
// });

// app.delete('/todos/:id', async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.status(204).send();
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });















const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1', // Can also use 'localhost'
  user: 'root', // Your MySQL username
  // password: 'your_correct_password', // Your MySQL password
  database: 'todo_app', // Your MySQL database name
  // If MySQL runs on a different port, specify it here (e.g., 3307)
  port: 3306, // Default is 3306, but update it if necessary
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected');
});

// Routes
app.get('/todos', (req, res) => {
  console.log('ncud7geft')
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
   console.log(title,'yeh hai title')
  const todo = { title };
  db.query('INSERT INTO todos SET ?', todo, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...todo });
  });
});

app.put('/todos/:id', (req, res) => {
  const { title, completed } = req.body;
  db.query('UPDATE todos SET ? WHERE id = ?', [{ title, completed }, req.params.id], (err) => {
    if (err) throw err;
    res.json({ id: req.params.id, title, completed });
  });
});

app.delete('/todos/:id', (req, res) => {
  db.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.status(204).send();
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
