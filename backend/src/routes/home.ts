import {createTask, deleteOne, findAll, updateOne} from "../controllers/home";
import {log} from "../middlewares/logs";
import {auth} from "../middlewares/auth";

const express = require('express');
const router = express.Router();

router.get('/', auth, findAll);
router.post('/', auth, createTask);
router.put('/:id', auth, log, updateOne);
router.delete('/:id', auth, log, deleteOne);

module.exports = router;
