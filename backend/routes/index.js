import { Router } from 'express';
import postsRouter from './posts.js';
import filtersRouter from './filters.js';
import userRouter from './users.js';
import accountRouter from './account.js'

const router = Router();
const basePath = '/api'

router.use(basePath + '/user', userRouter);
router.use(basePath + '/posts', postsRouter);
router.use(basePath + '/filters', filtersRouter);
router.use(basePath + '/user', userRouter)


export default router;
