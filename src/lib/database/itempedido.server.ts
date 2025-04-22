'use server';

import { IItemPedido } from "../../utils/interface";
import { supabaseServer } from "../supabase/server";

export async function criaItemPedido(data: Omit<IItemPedido, 'id'>) {
  try {
    const insertedRow = await supabaseServer
    .from('itenspedido')
    .insert({
      idpedido: data.idpedido,
      iditem: data.iditem,
      quant: data.quant,
      valor: data.valor,
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function atualizaItemPedido(data: IItemPedido) {
  try {
    await supabaseServer
    .from('itenspedido')
    .update({
      idpedido: data.idpedido,
      iditem: data.iditem,
      quant: data.quant,
      valor: data.valor,
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function excluiItemPedido(id: number) {
  try {
    await supabaseServer
    .from('itenspedido')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function localizarItens(idpedido: number) {
  try {
    const { data } = await supabaseServer
    .from('itenspedido')
    .select('*')
    .eq('idpedido', idpedido)
    return data
  } catch(error) {
    console.log(error)
  }
}
