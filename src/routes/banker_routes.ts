import express, { Express} from 'express';
const app: Express = express();
const router = express.Router();
import { connect } from '../controllers/connect_controller';
import { createBanker } from '../controllers/banker_controllers';
router.route("/").post(createBanker);
router.route('/:bankerId/client/:clientId/').put(connect)
export default router