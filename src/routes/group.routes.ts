import { Router } from 'express';
import { createGroup, getGroups, joinGroup } from '../controllers/group.controller.js';
import { getGroupMessages } from '../controllers/message.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createGroupSchema } from '../dtos/group.dto.js';

const router = Router();

router.use(authenticate);

router.post('/', validate(createGroupSchema), createGroup);
router.get('/', getGroups);
router.post('/:name/join', joinGroup);
router.get('/:id/messages', getGroupMessages);

export default router;
