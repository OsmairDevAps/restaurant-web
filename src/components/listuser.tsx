import { useUserDatabase } from "@/lib/database/usuario_"
import { IUser } from "@/utils/interface"
import { useEffect, useState } from "react"

export default function ListUser() {
  const [user, setUser] = useState<IUser[]>([])
  const usuarioDatabase = useUserDatabase()

  async function ListUser() {
    const response = await usuarioDatabase.list()
    if (response) {
      setUser(response)
    }
  }
  
  useEffect(() => {
    ListUser()
  },[])
  
  return (
    <div>
      {user.map(item => <p key={item.id}>{item.name}</p>)}
    </div>
  )
}