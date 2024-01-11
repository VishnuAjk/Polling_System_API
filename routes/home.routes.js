import express from 'express'
import { welcomeHome } from '../controller/home.controller.js';

const homeRouter = express.Router();

homeRouter.route('/').get(welcomeHome);


export default homeRouter;