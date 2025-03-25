import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token, "secreto123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Acceso solo para admins" });
  next();
};
