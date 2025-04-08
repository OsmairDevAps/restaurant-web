'use server'

import { supabaseServer } from "../supabase/server";
import { IMovCaixa } from "../../utils/interface";

export async function createMovCash(data: Omit<IMovCaixa, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('movimentacoescaixa').insert({
      caixaid: data.caixaid,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function updateMovCash(data: IMovCaixa) {
  try {
    await supabaseServer
    .from('movimentacoescaixa')
    .update({
      caixaid: data.caixaid,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
  })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function removeMovCash(id: number) {
  try {
    await supabaseServer
    .from('movimentacoescaixa')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    console.log(error)
  }
}
