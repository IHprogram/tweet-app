import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import mongoURI from './mongouri.js';

// ルーティング読み込み
import tweetRoutes from './routes/tweets.js';

const app = express();
const port = 3001;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ルーティング設定
app.use('/tweets', tweetRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(mongoURI, { useNewPaser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => {
    console.log(`${port}につなぎました！`)
  }))