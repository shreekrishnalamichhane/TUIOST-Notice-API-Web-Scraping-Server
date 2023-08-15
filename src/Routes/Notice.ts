import express from 'express';
const router = express.Router();

import NoticeController from '../Controllers/NoticeController';

router.get('/', NoticeController.watch);

export default router;
