import {Router} from 'express';
import registerUser from '../controllers/userRegister.controller';

const routes = Router();

routes.route("/register").post(registerUser)

export default routes;