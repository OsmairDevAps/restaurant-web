export async function listCategory() {
  const res = await fetch('../api/category');
  return res.json()
}