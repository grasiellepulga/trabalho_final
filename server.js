import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";
import jogoRoutes from "./src/routes/jogoRoutes.js";
import avaliacaoRoutes from "./src/routes/avaliacaoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("html"));

app.use("/api/users", userRoutes);
app.use("/api/jogos", jogoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

app.get("/", (req, res) => {
  res.sendFile("usuarios.html", { root: "html" });
});

export default app;