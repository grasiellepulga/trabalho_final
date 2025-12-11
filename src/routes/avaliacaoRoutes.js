import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// POST /api/avaliacoes  (criar avaliação)
router.post("/", async (req, res) => {
  const { nota, comentario, id_jogo, id_user } = req.body;

  const { data, error } = await supabase
    .from("avaliacoes")
    .insert({
      nota,
      comentario,
      id_jogo,
      id_user
    })
    .select("*")
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
});

// GET /api/avaliacoes  (listar avaliações)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("avaliacoes")
    .select("*, users(nome), jogos(nome)");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

export default router;
