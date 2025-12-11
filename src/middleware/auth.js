import { supabase } from "../supabaseClient.js";

export async function auth(req, res, next) {
    const idUser = req.headers.authorization;
  
    if (!idUser) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
  
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id_user", idUser)
      .single();
  
    if (error || !data) {
      return res.status(401).json({ error: "Usuário inválido" });
    }
  
    req.user = data;
    next();
  }
  