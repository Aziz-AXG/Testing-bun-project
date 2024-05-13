import express from "express";
import errorHandler from "./middleware/ErrorHandler";
import router from "./router/mainRouter";

const app = express();

app.use(express.json());

// ? to know the api url call
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", router);

app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).json({ message: "not Found" });
});

app.listen(5000, () => {});
