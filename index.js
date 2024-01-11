import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDB } from './config/mongoose.js';
import homeRouter from './routes/home.routes.js';
import questionRouter from './routes/question.routes.js'
import optionRouter from './routes/option.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', homeRouter);
app.use('/question', questionRouter);
app.use('/option', optionRouter);



app.listen(3000, ()=>{
    console.log("Listening at 3000");
    connectToDB();
})