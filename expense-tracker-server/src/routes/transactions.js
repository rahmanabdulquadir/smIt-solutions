import express from 'express';
const router = express.Router();
import * as controller from '../controller/transactionController.js';


router.post('/', controller.createTransaction);
router.get('/', controller.getAllTransactions);
router.get('/summary', controller.getSummary);


export default router;