import express from 'express';
const router = express.Router();

import NoticeController from '../Controllers/NoticeController';

router.get('/watch', NoticeController.watch);
router.get('/all', NoticeController.all);

export default router;
