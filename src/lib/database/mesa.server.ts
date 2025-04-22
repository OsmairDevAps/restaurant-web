'use server'

import { supabaseServer } from "../supabase/server";
import { IMesa } from "../../utils/interface";

export async function criaMesa(data: Omit<IMesa, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('mesas').insert({
      num: data.num,
      status: data.status,
      cor: data.cor
    })
    return { insertedRow } 
  } catch(error) {
    throw error
  }
}

export async function atualizaMesa(data: IMesa) {
  try {
    await supabaseServer
    .from('mesas')
    .update({
      num: data.num,
      status: data.status,
      cor: data.cor
    })
    .eq('id', data.id)
    return 
  } catch(error) {
    throw error
  }
}

export async function excluiMesa(id: number) {
  try {
    await supabaseServer
    .from('mesas')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    throw error
  }
}

export async function verMesa(id: number) {
  try {
    const { data, error } = await supabaseServer
    .from('mesas')
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
