// src/schemas/bitacora.schema.ts
import { z } from "zod";

export const bitacoraEntrySchema = z.object({
  fecha: z.string().min(1),
  dia: z.string().min(1),
  par: z.string().min(1),
  posicion: z.enum(["buy", "sell"]),
  entrada: z.number(),
  tp: z.number(),
  sl: z.number(),
  tiempo_operado: z.string().optional(),
  estado_posicion: z.enum(["TP", "SL", "BE"]),
  sentimiento: z.string().optional(),
  capitalAnterior: z.number(), // viene del frontend
  porcentajeRiesgo: z.number(), // valor como 1.5 (%)
});