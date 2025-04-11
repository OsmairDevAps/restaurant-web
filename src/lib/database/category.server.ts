'use server';

import { ICategory } from "../../utils/interface";
import { supabaseServer } from "../supabase/server";

export async function createCategory(data: Omit<ICategory, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('categorias').insert({
      description: data.description,
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function updateCategory(data: ICategory) {
  try {
    await supabaseServer
    .from('categorias')
    .update({
      description: data.description,
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function removeCategory(id: number) {
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

export async function findOnce(id: number) {
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
