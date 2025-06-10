/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createTradingEntry } from "../../services/tradingEntryServices";
import { useNotification } from "../../context/NotificationContext";
import Button from "../../components/ui/Button";

interface TradingEntry {
  datetime: string;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  tp: number;
  sl: number;
  duration: string;
  result: "TP" | "SL" | "BE";
  lotSize: number;
}

interface Props {
  onClose: () => void;
}

export const TradingEntryForm: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState<TradingEntry>({
    datetime: "",
    pair: "",
    type: "buy",
    entry: 0,
    tp: 0,
    sl: 0,
    duration: "",
    result: "TP",
    lotSize: 0,
  });
  const { notify } = useNotification();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["entry", "tp", "sl", "lotSize"].includes(name)
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      lot_size: formData.lotSize,
    };

    delete (formattedData as any).lotSize;

    try {
      await createTradingEntry(formattedData);
      notify("Operación creada correctamente", "success");

      setFormData({
        datetime: "",
        pair: "",
        type: "buy",
        entry: 0,
        tp: 0,
        sl: 0,
        duration: "",
        result: "TP",
        lotSize: 0,
      });

      onClose();
    } catch (error: any) {
      console.error("Error:", error);
      notify("Error al crear operación", "error");
    }
  };

  return (
    <form className="trading-entry-form" onSubmit={handleSubmit}>
      <h2>Registrar nueva operación</h2>

      <label>Fecha y hora</label>
      <input
        type="datetime-local"
        name="datetime"
        value={formData.datetime}
        onChange={handleChange}
        required
      />

      <label>Par de divisas</label>
      <select
        name="pair"
        value={formData.pair}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un par</option>
        <option value="EUR/USD">EUR/USD</option>
        <option value="USD/JPY">USD/JPY</option>
        <option value="GBP/USD">GBP/USD</option>
        <option value="USD/CHF">USD/CHF</option>
        <option value="AUD/USD">AUD/USD</option>
      </select>

      <label>Tipo de operación</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="buy">Compra (Buy)</option>
        <option value="sell">Venta (Sell)</option>
      </select>

      <label>Precio de entrada</label>
      <input
        type="number"
        name="entry"
        value={formData.entry}
        onChange={handleChange}
        step="0.00001"
        required
      />

      <label>Take Profit</label>
      <input
        type="number"
        name="tp"
        value={formData.tp}
        onChange={handleChange}
        step="0.00001"
        required
      />

      <label>Stop Loss</label>
      <input
        type="number"
        name="sl"
        value={formData.sl}
        onChange={handleChange}
        step="0.00001"
        required
      />

      <label>Duración de la operación</label>
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Ej: 15m, 1h, 4h"
        required
      />

      <label>Resultado</label>
      <select name="result" value={formData.result} onChange={handleChange}>
        <option value="TP">Take Profit</option>
        <option value="SL">Stop Loss</option>
        <option value="BE">Break Even</option>
      </select>

      <label>Tamaño del lote</label>
      <input
        type="number"
        name="lotSize"
        value={formData.lotSize}
        onChange={handleChange}
        step="0.01"
        required
      />

      <div className="form-buttons">
        <Button type="submit" variant="primary">
          Guardar operación
        </Button>
        <Button type="button" variant="cancel" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
