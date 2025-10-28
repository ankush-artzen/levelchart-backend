import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import { integration, integrationAdd, integrationProfile, logout } from '../controllers/integration';

const router = express.Router();

router.get('/', integrationAdd);

router.get('/integration/auth/logout', logout);

router.get('/profile', requiresAuth(), integrationProfile);

router.get('/integration', integration);


export default router;
