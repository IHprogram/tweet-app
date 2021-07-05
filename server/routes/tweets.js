import express from 'express';
import { getTweets, createTweet, deleteTweet } from '../controllers/tweets.js';

const router = express.Router();

router.get('/', getTweets);
router.post('/', createTweet);
router.delete('/:id', deleteTweet)

export default router;