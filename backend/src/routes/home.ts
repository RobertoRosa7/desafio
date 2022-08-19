import {createTask, deleteOne, findAll, updateOne} from "../controllers/home";
import {deleteLog, updateLog} from "../middlewares/logs";

const express = require('express');
const router = express.Router();

router.get('/', findAll);
router.post('/', createTask);
router.put('/:id', updateLog, updateOne);
router.delete('/:id', deleteLog, deleteOne);

module.exports = router;
