import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// POST /api/jogos  (criar jogo)
router.post("/", async (req, res) => {
  const { nome, descricao, categoria, data_lancamento, preco, id_admin } = req.body;

  const { data, error } = await supabase
    .from("jogos")
    .insert({
      nome,
      descricao,
      categoria,
      data_lancamento,
      preco,
      id_admin
    })
    .select("*")
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
});

// GET /api/jogos  (listar jogos)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("jogos").select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// GET /api/jogos/:id  (jogo + avaliações)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data: jogo, error: jogoError } = await supabase
    .from("jogos")
    .select("*")
    .eq("id_jogo", id)
    .single();

  if (jogoError || !jogo) {
    return res.status(404).json({ error: "Jogo não encontrado" });
  }

  const { data: avaliacoes, error: avalError } = await supabase
    .from("avaliacoes")
    .select("*, users(nome, email)")
    .eq("id_jogo", id);

  if (avalError) {
    return res.status(400).json({ error: avalError.message });
  }

  res.json({ jogo, avaliacoes });
});

export default router;
