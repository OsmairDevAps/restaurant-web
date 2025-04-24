export async function listCommand() {
  const res = await fetch('../api/mesa');
  return res.json()
}