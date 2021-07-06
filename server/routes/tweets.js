import express from 'express';
import { getTweets, createTweet, updateTweet, deleteTweet } from '../controllers/tweets.js';

const router = express.Router();

router.get('/', getTweets);
router.post('/', createTweet);
router.put('/:id', updateTweet);
router.delete('/:id', deleteTweet)

export default router;