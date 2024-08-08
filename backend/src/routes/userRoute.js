import express from 'express'
import userController from '../controllers/userController.js';
// import { isValidated } from '../auth/controller';
import multer from 'multer';
import { Repository } from '../repository/repository.js';
import { UserService } from '../services/user.services.js';
import UserModel from '../model/schemas/user/user.schema.js';
import { protect } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage()
const upload = multer({storage})
const userRoute = express();

const repository = new Repository(UserModel);
const services = new UserService(repository);
const controller = new userController(services);


userRoute.post('/register', controller.register)
userRoute.post('/login', controller.login)
userRoute.post('/logout', controller.logout)
userRoute.get('/me', protect, controller.getUser)
userRoute.put('/', protect, controller.updateUser)




export default userRoute