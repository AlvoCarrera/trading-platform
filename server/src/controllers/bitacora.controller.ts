import { Request, Response } from "express";
import { bitacoraEntrySchema } from "../schemas/bitacora.schema";
import { supabase } from "../config/supabase";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const createBitacoraEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const userId = decoded.id;

    const parsed = bitacoraEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const {
      fecha,
      dia,
      par,
      posicion,
      entrada,
      tp,
      sl,
      tiempo_operado,
      estado_posicion,
      sentimiento,
      capitalAnterior,
      porcentajeRiesgo,
    } = parsed.data;

    // 🔐 Cálculos backend
    const riesgo = parseFloat(((porcentajeRiesgo / 100) * capitalAnterior).toFixed(2));
    let resultado = 0;

    if (estado_posicion === "TP") resultado = riesgo * 2;
    else if (estado_posicion === "SL") resultado = -riesgo;
    else resultado = 0; // BE

    const capital = parseFloat((capitalAnterior + resultado).toFixed(2));

    // Guardar en Supabase
    const { error } = await supabase.from("bitacora_entries").insert({
      id: uuidv4(),
      user_id: userId,
      fecha,
      dia,
      par,
      posicion,
      entrada,
      tp,
      sl,
      tiempo_operado,
      estado_posicion,
      sentimiento,
      riesgo,
      resultado,
      capital,
    });

    if (error) throw error;

    return res.status(201).json({ message: "Operación registrada correctamente" });
  } catch (err: any) {
    console.error("[Bitacora Error]", err.message);
    return res.status(500).json({ message: "Error interno al guardar la operación" });
  }
};