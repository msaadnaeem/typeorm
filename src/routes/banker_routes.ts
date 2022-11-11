import express, { Express} from 'express';
const app: Express = express();
const router = express.Router();
import { createBanker,connect } from '../controllers/banker';
router.route("/").post(createBanker);
router.route('/:bankerId/client/:clientId/').put(connect)
export default router