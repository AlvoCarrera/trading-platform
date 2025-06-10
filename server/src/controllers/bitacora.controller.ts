import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../utils/verifyToken";
import { calculateTradingMetrics } from "../services/tradingEntry.services";

export const createTradingEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const userId = await verifyToken(token);

    const {
      datetime,
      pair,
      type,
      entry,
      tp,
      sl,
      duration,
      result,
      lot_size,
    } = req.body;

    const {
      pipsProfit,
      pipsStop,
      riskRewardRatio,
      pipValueTotal,
      profit,
    } = calculateTradingMetrics({
      pair,
      entry,
      tp,
      sl,
      result,
      lot_size,
    });

    const { error } = await supabase.from("trading_entries").insert({
      id: uuidv4(),
      user_id: userId,
      datetime,
      pair,
      type,
      entry,
      tp,
      sl,
      duration,
      result,
      lot_size,
      pips_profit: pipsProfit,
      pips_stop: pipsStop,
      risk_reward_ratio: riskRewardRatio,
      pip_value_total: pipValueTotal,
      profit,
    });

    if (error) throw error;

    return res.status(201).json({ message: "Trading entry saved successfully" });
  } catch (err: any) {
    console.error("[Entry Error]", err.message);
    return res.status(500).json({ message: err.message || "Internal error saving the trading entry" });
  }
};

export const getTradingEntries = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const userId = await verifyToken(token);

    const { data, error } = await supabase
      .from("trading_entries")
      .select("*")
      .eq("user_id", userId)
      .order("datetime", { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("[Get Entries Error]", err.message);
    return res.status(500).json({ message: "Failed to fetch trading entries" });
  }
};

export const getTradingEntryById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const userId = await verifyToken(token);
    const { id } = req.params;

    const { data, error } = await supabase
      .from("trading_entries")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id)
      .single();

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("[Get Entry By ID Error]", err.message);
    return res.status(500).json({ message: "Failed to fetch trading entry" });
  }
};

export const updateTradingEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const userId = await verifyToken(token);
    const { id } = req.params;
    const {
      datetime,
      pair,
      type,
      entry,
      tp,
      sl,
      duration,
      result,
      lot_size,
    } = req.body;

    const {
      pipsProfit,
      pipsStop,
      riskRewardRatio,
      pipValueTotal,
      profit,
    } = calculateTradingMetrics({
      pair,
      entry,
      tp,
      sl,
      result,
      lot_size,
    });

    const { error } = await supabase
      .from("trading_entries")
      .update({
        datetime,
        pair,
        type,
        entry,
        tp,
        sl,
        duration,
        result,
        lot_size,
        pips_profit: pipsProfit,
        pips_stop: pipsStop,
        risk_reward_ratio: riskRewardRatio,
        pip_value_total: pipValueTotal,
        profit,
      })
      .eq("user_id", userId)
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({ message: "Trading entry updated successfully" });
  } catch (err: any) {
    console.error("[Update Entry Error]", err.message);
    return res.status(500).json({ message: "Failed to update trading entry" });
  }
};

export const deleteTradingEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const userId = await verifyToken(token);
    const { id } = req.params;

    const { error } = await supabase
      .from("trading_entries")
      .delete()
      .eq("user_id", userId)
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({ message: "Trading entry deleted successfully" });
  } catch (err: any) {
    console.error("[Delete Entry Error]", err.message);
    return res.status(500).json({ message: "Failed to delete trading entry" });
  }
};