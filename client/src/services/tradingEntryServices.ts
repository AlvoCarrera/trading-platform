/* eslint-disable @typescript-eslint/no-explicit-any */
export const createTradingEntry = async (entryData: {
  datetime: string;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  tp: number;
  sl: number;
  duration: string;
  result: "TP" | "SL" | "BE";
  lotSize: number;
}) => {
  const token = localStorage.getItem("token");  

  const response = await fetch("http://localhost:4000/api/bitacora", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(entryData),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error saving trading entry");

  return result;
};

export const getTradingEntries = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:4000/api/bitacora", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error fetching trading entries");

  return result;
};

export const getTradingEntryById = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:4000/api/bitacora/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error fetching trading entry");
  return result;
};

export const updateTradingEntry = async (id: string, updatedData: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:4000/api/bitacora/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error updating trading entry");
  return result;
};

export const deleteTradingEntry = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:4000/api/bitacora/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error deleting trading entry");
  return result;
};