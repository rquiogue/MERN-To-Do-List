import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

import Todo from './models/todoItemModel.js';
import { emitWarning } from 'process';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/todos', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

app.delete('/todo/delete/:id', async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.put('/todo/complete/:id', async(req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
});

app.listen(port, () => console.log(`Server running on port ${port}`));