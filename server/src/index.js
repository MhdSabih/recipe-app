import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './router/user.js';
import { RecipeRouter } from './router/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipes', RecipeRouter);

mongoose.connect("mongodb://0.0.0.0:27017/recipes").then(() => {
    console.log(`DB connected`);
});

app.listen(3001, () => {
    console.log(`Server Started`);
})