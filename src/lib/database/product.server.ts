'use server'

import { supabaseServer } from "../supabase/server";
import { IProduct } from "../../utils/interface";

export async function createProduct(data: Omit<IProduct, 'id'>) {
  try {
    const insertedRow = await supabaseServer
    .from('produtos')
    .insert({
      categoryid: data.categoryid,
      name: data.name,
      price: data.price
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function updateProduct(data: IProduct) {
  try {
    await supabaseServer
    .from('produtos')
    .update({
      categoryid: data.categoryid,
      name: data.name,
      price: data.price
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function removeProduct(id: number) {
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

export async function findByCategory(id: number) {
  try {
    const { data } = await supabaseServer
    .from('produtos')
    .select('*')
    .eq('categoryid', id)
    .order('name', {ascending: true})
    return data
  } catch (error) {
    throw error
  }  
}
