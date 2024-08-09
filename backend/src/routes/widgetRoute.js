import express from 'express'
import { Repository } from '../repository/repository.js';
import { protect } from '../middlewares/authMiddleware.js';
import DisplayModel from '../model/schemas/widget/widget.display.schema.js';
import WidgetModel from '../model/schemas/widget/widget.schema.js';
import { WidgetService } from '../services/widget.service.js';
import WidgetController from '../controllers/widgetController.js';


const widgetRoute = express();

const displayRepository = new Repository(DisplayModel);
const widgetRepository = new Repository(WidgetModel);
const services = new WidgetService(displayRepository, widgetRepository);
const controller = new WidgetController(services);

widgetRoute.put('/:id', protect, controller.addWidget)
widgetRoute.put('/display/:id', protect, controller.addDisplay)


export default widgetRoute