const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const mainRouter = require('./routes/index')
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use("/api/v1", mainRouter);

app.listen(port);
console.log("SERVER RUNNING ON http://localhost:" + port + "/api/v1");