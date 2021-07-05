import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import mongoURI from './mongouri.js';

const app = express();
const port = 3001;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(mongoURI, { useNewPaser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => {
    console.log(`${port}につなぎました！`)
  }))