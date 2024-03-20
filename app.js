const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');

const userRouter = require('./routers/user');
const drinkRouter = require('./routers/drink');
const authenticator = require('./middleware/authenticator');

const app = express();
app.use(cors());
app.use(express.json());
if(process.env.NODE_ENV !== "test") app.use(logger);

app.get("/", (req, res) => {
    res.send("Welcome to the Mocktologist API! Look at our drinks.");
});

app.use("/user", userRouter);
app.use("/drink", authenticator, drinkRouter);

module.exports = app;