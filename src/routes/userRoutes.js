import express from "express";
import { supabase } from "../supabaseClient.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// POST /api/users (criar usuário)
router.post("/", async (req, res) => {
  const { nome, email, senha, tipo_user, data_nascimento } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert({
      nome,
      email,
      senha,
      tipo_user: tipo_user || "cliente",
      data_nascimento
    })
    .select("*")
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
});

// GET /api/users (listar todos)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// POST /api/users/login (login)
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("senha", senha)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ message: `Bem-vindo(a), ${data.nome}!`, user: data });
});

// DELETE /api/users/:id (somente admins)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id_user", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Usuário excluído com sucesso." });
});

export default router;
