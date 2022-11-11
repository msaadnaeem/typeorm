import express, { Express} from 'express';
const app: Express = express();
const router = express.Router();
import { createClient,createTransaction,deleteClient,fetchClient } from '../controllers/client';
router.route("/").post(createClient);
router.route("/:clientId").delete(deleteClient).get(fetchClient)
router.route("/:id/transaction").post(createTransaction);
export default router