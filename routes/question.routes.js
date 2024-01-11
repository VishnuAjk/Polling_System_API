import express from 'express';
const questionRouter = express.Router();

import * as questionsController from '../controller/question.controller.js'

questionRouter.post('/create', questionsController.createQuestion);
questionRouter.post('/:id/options/create', questionsController.createOptions);
questionRouter.delete('/:id/delete', questionsController.deleteQuestion)
questionRouter.get('/:id', questionsController.viewQuestion)

export default questionRouter;
