import {login} from "../controllers/login";

const express = require('express');
const router = express.Router();

router.get('/', login);

module.exports = router;
