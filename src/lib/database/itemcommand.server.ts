'use server';

import { ICommandItem } from "../../utils/interface";
import { supabaseServer } from "../supabase/server";

export async function createItemCommand(data: Omit<ICommandItem, 'id'>) {
  try {
    const insertedRow = await supabaseServer
    .from('itensmesa')
    .insert({
      idtable: data.idtable,
      category: data.category,
      product: data.product,
      amount: data.amount,
      price: data.price,
      client: data.client,
      clientdoc: data.clientdoc,
      obs: data.obs
    })
    return { insertedRow } 
  } catch(error) {
    console.log(error)
  }
}

export async function updateItemCommand(data: ICommandItem) {
  try {
    await supabaseServer
    .from('itensmesa')
    .update({
      idtable: data.idtable,
      category: data.category,
      product: data.product,
      amount: data.amount,
      price: data.price,
      client: data.client,
      clientdoc: data.clientdoc,
      obs: data.obs
    })
    .eq('id', data.id)
    return
  } catch(error) {
    console.log(error)
  }
}

export async function removeItemCommand(id: number) {
  try {
    await supabaseServer
    .from('itensmesa')
    .delete()
    .eq('id', id)
    return
  } catch(error) {
    console.log(error)
  }
}
