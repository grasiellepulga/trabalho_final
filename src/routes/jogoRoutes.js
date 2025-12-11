import express from "express";
import { supabase } from "../supabaseClient.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();


// ==================== CRIAR JOGO (ADMIN) ====================
router.post("/", checkAdmin, async (req, res) => {
  const { nome, descricao, categoria, data_lancamento, preco } = req.body;

  const { data, error } = await supabase
    .from("jogos")
    .insert({
      nome,
      descricao,
      categoria,
      data_lancamento,
      preco,
      id_admin: req.user.id_user
    })
    .select("*")
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
});


// ==================== LISTAR TODOS OS JOGOS ====================
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("jogos").select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});


// ==================== JOGO + AVALIAÇÕES ====================
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


// ==================== DELETAR JOGO (ADMIN) ====================
router.delete("/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("jogos")
    .delete()
    .eq("id_jogo", id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Jogo removido com sucesso." });
});


export default router;
