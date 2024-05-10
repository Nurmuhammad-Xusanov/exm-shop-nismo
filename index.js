import express from "express";
import { create } from "express-handlebars";
import AuthRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import ProductRoutes from "./routes/products.js";
import session from "express-session";
import dotenv from "dotenv";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import varMIddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";
import hbshelper from './utils/index.js'


dotenv.config();

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: hbshelper,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "nismo", resave: false, saveUninitialized: false }));
app.use(flash());
app.use(cookieParser());
app.use(varMIddleware);
app.use(userMiddleware)

app.use(AuthRoutes);
app.use(ProductRoutes);

const startApp = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    const PORT = process.env.PORT || 4100;
    app.listen(4100, () => console.log(`server is running on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

startApp();


