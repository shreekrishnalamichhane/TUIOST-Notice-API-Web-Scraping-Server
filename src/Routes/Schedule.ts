import express from 'express';
const router = express.Router();

import ScheduleController from '../Controllers/ScheduleController';

router.get('/watch', ScheduleController.watch);
router.get('/all', ScheduleController.all);

export default router;
