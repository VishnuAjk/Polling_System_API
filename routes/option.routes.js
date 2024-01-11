import express from 'express';
const optionRouter = express.Router()

import * as optionsController from '../controller/option.controller.js'

optionRouter.delete('/:id/delete', optionsController.deleteOption);
optionRouter.put('/:id/add_vote', optionsController.addVote);

export default optionRouter;