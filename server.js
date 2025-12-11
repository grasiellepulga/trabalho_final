import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";
import jogoRoutes from "./src/routes/jogoRoutes.js";
import avaliacaoRoutes from "./src/routes/avaliacaoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jogos", jogoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

app.get("/", (req, res) => {
  res.send("API White Label Games 🎮 rodando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
