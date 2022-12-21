import express from "express";
import mainRouter from "./routes/user.routes.js";
import session from "express-session";
import passport from "passport";
import { loginFunc, signUpFunc } from "./services/auth.js";
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import { initDb } from "./db/db.js";

const app = express();

app.use(express.json());

await initDb();
console.log("Conectado a la DB");

const ttlSeconds = 600;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
  }),
  secret: "secretString",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));

app.use(passport.initialize());

app.use(passport.session());

passport.use("login", loginFunc);
passport.use("signup", signUpFunc);

app.use("/api", mainRouter);

app.listen(config.PORT, () =>
  console.log(`Escuchando en el puerto ${config.PORT}`)
);
