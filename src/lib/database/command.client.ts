export async function listCommand() {
  const res = await fetch('../api/command');
  return res.json()
}