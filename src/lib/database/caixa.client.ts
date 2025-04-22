export async function listCaixa() {
  const res = await fetch('../api/caixa')
  return res.json()
}
