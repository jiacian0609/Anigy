import { Router } from 'express';
import postsRouter from './posts.js';
import usersRouter from './users.js';

const router = Router();
const basePath = '/api'

router.use(basePath + '/users', usersRouter);
router.use(basePath + '/posts', postsRouter);

export default router;
