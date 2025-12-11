import { supabase } from "../supabaseClient.js";

export async function checkAdmin(req, res, next) {
  const userId = req.headers["authorization"];

  if (!userId) {
    return res.status(401).json({ error: "Token não enviado." });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id_user", userId)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: "Usuário inválido." });
  }

  if (user.tipo_user !== "admin") {
    return res
      .status(403)
      .json({ error: "Apenas administradores podem realizar esta ação!" });
  }

  // Disponibiliza o usuário para as rotas
  req.user = user;

  next();
}
