'use server'

import { supabaseServer } from "../supabase/server";
import { ICommand } from "../../utils/interface";

export async function createCommand(data: Omit<ICommand, 'id'>) {
  try {
    const insertedRow = await supabaseServer.from('mesas').insert({
      num: data.num,
      client: data.client,
      clientdoc: data.clientdoc,
      price: data.price,
      status: data.status
    })
    return { insertedRow } 
  } catch(error) {
    throw error
  }
}

export async function updateCommand(data: ICommand) {
  try {
    await supabaseServer
    .from('mesas')
    .update({
      num: data.num,
      client: data.client,
      clientdoc: data.clientdoc,
      price: data.price,
      status: data.status
    })
    .eq('id', data.id)
    return 
  } catch(error) {
    throw error
  }
}

export async function removeCommand(id: number) {
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
