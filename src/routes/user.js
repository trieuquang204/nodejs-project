import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verify_token';
import {isAdmin, isModerator} from '../middlewares/verify_roles';

const router = express.Router()


router.use(verifyToken)
router.use(isModerator)

// router.get('/', [verifyToken, isAdmin], controllers.getCurrent)
router.get('/', controllers.getCurrent)

module.exports = router;