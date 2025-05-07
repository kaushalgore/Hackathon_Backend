const express = require("express");
const cors = require("cors");
const { jwtAuth } = require("./utils/jwtauth");

const userRouter = require("./routes/users");
const quoteRouter = require("./routes/quotes");
const favRouter = require("./routes/favourites");

const app = express();
app.use(cors());
app.use(express.json());
app.use(jwtAuth);

// Routes
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);
app.use("/favourites", favRouter);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
    console.log("Server ready at port", port);
});
