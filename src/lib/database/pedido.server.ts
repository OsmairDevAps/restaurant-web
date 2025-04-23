'use server'

import { supabaseServer } from "../supabase/server";
import { IPedido } from "../../utils/interface";

export async function criaPedido(data: Omit<IPedido, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('pedidos').insert({
      idmesa: data.idmesa
    })
    return { insertedRow } 
  } catch(error) {
    throw error
  }
}

export async function atualizaPedido(data: IPedido) {
  try {
    await supabaseServer
    .from('pedidos')
    .update({
      idmesa: data.idmesa
    })
    .eq('id', data.id)
    return 
  } catch(error) {
    throw error
  }
}

export async function excluiPedido(id: number) {
  try {
    await supabaseServer
    .from('pedidos')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    throw error
  }
}

export async function verPedido(id: number) {
  try {
    const { data, error } = await supabaseServer
    .from('pedidos')
    .select('*')
    .eq('id', id)
    if (data) {
      return data[0]
    } else {
      return error
    }
  } catch(error) {
    throw error
  }
}

