require('express-async-errors');
require('dotenv/config');

const cors = require('cors');
const express = require('express');

const routes = require('./routes');
const sqliteConnection = require('./database/sqlite');
const form = require('./utils/functions/formattedDate');
const handlingErrors = require('./middlewares/handlingErrors');
const uploadConfig = require('./config/upload');

const date = form();
const server = express();

const HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT = process.env.SERVER_PORT || 3333;

server.use(cors());

server.use(express.json());

server.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

server.use(routes);

sqliteConnection();

server.use(handlingErrors);

server.listen(PORT, () => console.log(`Today is ${date} and Server is running at http://${HOSTNAME}:${PORT}/`));
