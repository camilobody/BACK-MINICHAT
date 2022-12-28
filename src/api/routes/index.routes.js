import { Router } from 'express';
import channel from './channel.routes.js';

const router = new Router();

const defaultRoutes = [
    { path: '/channel', route: channel },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
