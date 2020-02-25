import express from "express";
import todo from "./src/routes/todo";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", todo);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default app;
