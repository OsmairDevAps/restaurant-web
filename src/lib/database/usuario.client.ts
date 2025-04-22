// lib/database/user.client.ts
export async function listUsers() {
  const res = await fetch('../api/users'); // Você pode criar uma rota API que chama `supabaseServer`
  return res.json();
}
