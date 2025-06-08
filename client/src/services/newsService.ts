export const getNewsFromAI = async (pair: string, username: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:4000/api/news?pair=${encodeURIComponent(pair)}&username=${encodeURIComponent(username)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || result.error || "Error al obtener noticias de la IA");

  return result;
};