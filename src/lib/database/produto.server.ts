'use server'

import { supabaseServer } from "../supabase/server";
import { IProduto } from "../../utils/interface";

export async function criaProduto(dados: Omit<IProduto, 'id'>) {
  try {
    const { data } = await supabaseServer
    .from('produtos')
    .insert({
      idcategoria: dados.idcategoria,
      nome: dados.nome,
      valorcusto: dados.valorcusto,
      valorfinal: dados.valorfinal
    }).select('id')
    if (data) return data[0].id
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
