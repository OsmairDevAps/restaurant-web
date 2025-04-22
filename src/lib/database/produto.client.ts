export async function listProducts() {
  const res = await fetch('../api/products'); // Você pode criar uma rota API que chama `supabaseServer`
  return res.json();
}