export async function listItemCommand() {
  const res = await fetch('../api/itemcommand')
  return res.json()
}
