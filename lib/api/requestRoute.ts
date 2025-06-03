export async function requestShortestRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  corredor: string // nuevo parámetro
) {
  const res = await fetch("/api/shortest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destination, corredor }),
  });

  if (!res.ok) throw new Error("No se pudo calcular la ruta");

  const data = await res.json();
  return data.route as { lat: number; lng: number }[];
}