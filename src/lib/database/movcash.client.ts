export async function listMovCash() {
  const res = await fetch('../api/movcash');
  return res.json();
}
