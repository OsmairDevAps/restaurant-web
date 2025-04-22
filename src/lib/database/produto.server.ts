'use server'

import { supabaseServer } from "../supabase/server";
import { IProduto } from "../../utils/interface";

export async function criaProduto(data: Omit<IProduto, 'id'>) {
  try {
    const insertedRow = await supabaseServer
    .from('produtos')
    .insert({
      idcategoria: data.idcategoria,
      name: data.nome,
      valorcusto: data.valorcusto,
      valorfinal: data.valorfinal
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function atualizaProduto(data: IProduto) {
  try {
    await supabaseServer
    .from('produtos')
    .update({
      idcategoria: data.idcategoria,
      name: data.nome,
      valorcusto: data.valorcusto,
      valorfinal: data.valorfinal
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function excluiProduto(id: number) {
  try {
    await supabaseServer
    .from('produtos')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function localizaPorCategoria(idcategoria: number) {
  try {
    const { data } = await supabaseServer
    .from('produtos')
    .select('*')
    .eq('idcategoria', idcategoria)
    .order('nome', {ascending: true})
    return data
  } catch (error) {
    throw error
  }  
}
