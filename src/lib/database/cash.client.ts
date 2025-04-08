export async function listCash() {
  const res = await fetch('../api/cash')
  return res.json()
}
