const express = require("express");
const dotenv = require("dotenv");
const { urlencoded } = require("body-parser");
const cookies = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const sanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const path = require("path");
const hpp = require("hpp");
const cors = require("cors");
const database = require("./middlewares/database");
const { errorDefault } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/users");
const carroRoutes = require("./routes/carros");

// Environment

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT;
const SERVER = process.env.SERVER;

database();

var app = express();

// Middlewares

// Body Data

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies());

// Seguranca - HTTP headers, CORS, mongoDB, Request limit

app.disable("x-powered-by");
app.use(sanitize());
app.use(helmet());
app.use(xssClean());

var limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(hpp());
app.use(cors());

// Public file sharing

app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/carros", carroRoutes);

// Default Error handler

app.use(errorDefault);

// start server

(async function () {
  app.listen(PORT, function () {
    console.log(`Server running on: ${SERVER}:${PORT}`);
  });
})();

process.on("unhandledRejection", function (error) {
  if (error) {
    console.error(`YOU GOT THIS ERROR: \n\n`);
    console.error(error);
  }
  process.exit(1);
});
