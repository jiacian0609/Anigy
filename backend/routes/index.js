import { Router } from 'express';
import postsRouter from './posts.js';
import loginRouter from './login.js';
import signupRouter from './signup.js';

const router = Router();
const basePath = '/api'

router.use(basePath + '/login', loginRouter);
router.use(basePath + '/signup', signupRouter);
router.use(basePath + '/posts', postsRouter);

export default router;
