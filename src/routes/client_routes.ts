import express, { Express} from 'express';
const app: Express = express();
const router = express.Router();
import { createClient } from '../controllers/client_controller';
import { createTransaction } from '../controllers/transaction_controller';
import {deleteClient} from "../controllers/delete_client"
import {fetchClient} from "../controllers/fetch_client"
router.route("/").post(createClient);
router.route("/:clientId").delete(deleteClient).get(fetchClient)
router.route("/:id/transaction").post(createTransaction);
export default router