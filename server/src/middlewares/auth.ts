import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Attach user to request
  (req as any).user = {
    id: data.user.id,
    email: data.user.email,
  };

  next();
};