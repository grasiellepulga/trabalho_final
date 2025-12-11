export function isAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
  
    if (req.user.tipo_user !== "admin") {
      return res.status(401).json({ error: "Apenas administradores podem realizar esta ação" });
    }
  
    next();
  }
  