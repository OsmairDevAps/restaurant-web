'use server';

import { ICategoria } from "../../utils/interface";
import { supabaseServer } from "../supabase/server";

export async function criaCategoria(data: Omit<ICategoria, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('categorias').insert({
      description: data.descricao,
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function atualizaCategoria(data: ICategoria) {
  try {
    await supabaseServer
    .from('categorias')
    .update({
      description: data.descricao,
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function excluiCategoria(id: number) {
  try {
    await supabaseServer
    .from('categorias')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function verCategoria(id: number) {
  try {
    const { data } = await supabaseServer
    .from('categorias')
    .select('*')
    .eq('id', id)
    if (data) {
      return data[0].description
    }
  } catch(error) {
    console.log(error)
  }
}
