import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

router.post('/', function(req, res, next) {
    res.send("users")
});

export default router;