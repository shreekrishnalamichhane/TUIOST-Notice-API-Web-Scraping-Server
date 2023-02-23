import express from 'express';
const router = express.Router();

import ResultController from '../Controllers/ResultController';

router.get('/watch', ResultController.watch);
router.get('/all', ResultController.all);

export default router;
