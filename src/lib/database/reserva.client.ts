// lib/database/user.client.ts
export async function listReservas() {
  const res = await fetch('../api/reserva'); // Você pode criar uma rota API que chama `supabaseServer`
  return res.json();
}
