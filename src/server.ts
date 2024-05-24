import express from "express";
import errorHandler from "./middleware/ErrorHandler";
import router from "./router/mainRouter";
import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import path from "path";

i18next
  .use(I18NexFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
  });

const app = express();

app.use(i18nextMiddleware.handle(i18next));

app.use(express.json());

// ? to know the api url call
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", router);

app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).json({
    errors: [
      { type: "not Found", message: "not Found", path: req.path, value: null },
    ],
  });
});

app.listen(5000, () => {});
