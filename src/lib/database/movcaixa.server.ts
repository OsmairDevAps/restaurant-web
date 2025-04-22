'use server'

import { supabaseServer } from "../supabase/server";
import { IMovCaixa } from "../../utils/interface";

export async function criaMovCaixa(data: Omit<IMovCaixa, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('movimentacoescaixa').insert({
      idcaixa: data.idcaixa,
      datamov: data.datamov,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function atualizaMovCaixa(data: IMovCaixa) {
  try {
    await supabaseServer
    .from('movimentacoescaixa')
    .update({
      idcaixa: data.idcaixa,
      datamov: data.datamov,
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

export async function excluiMovCaixa(id: number) {
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
