import express from 'express'
import { Repository } from '../repository/repository.js';
import { protect } from '../middlewares/authMiddleware.js';
import ProjectController from '../controllers/projectController.js';
import { ProjectService } from '../services/project.service.js';
import ProjectModel from '../model/schemas/project/project.schema.js';
import { UploadModel } from '../model/schemas/project/uploads.schema.js';

const projectRoute = express();

const projectRepository = new Repository(ProjectModel);
const uploadRepository = new Repository(UploadModel);
const services = new ProjectService(projectRepository, uploadRepository);
const controller = new ProjectController(services);

projectRoute.post('/', protect, controller.create)
projectRoute.get('/', protect, controller.getProjects)
projectRoute.post('/upload', protect, controller.createUpload)
projectRoute.delete('/upload/:id', protect, controller.deleteUpload)
projectRoute.put('/upload/:id', protect, controller.updateUpload)
projectRoute.get('/uploads/:id', protect, controller.getUploads)
projectRoute.get('/upload/:id', protect, controller.getUpload)



export default projectRoute