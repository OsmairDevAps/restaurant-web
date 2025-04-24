'use server';

import { IItemPedido } from "../../utils/interface";
import { supabaseServer } from "../supabase/server";

export async function criaItemPedido(dados: Omit<IItemPedido, 'id'>) {
  try {
    const { data } = await supabaseServer
    .from('itenspedido')
    .insert({
      idpedido: dados.idpedido,
      iditem: dados.iditem,
      quant: dados.quant,
      valor: dados.valor,
    }).select('id')
    if (data) return data[0].id
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

export async function listaItensPedidos(idpedido: number) {
  try {
    const { data } = await supabaseServer
    .from('view_list_itens_pedidos')
    .select('*')
    .eq('idpedido', idpedido)
    return data
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

export async function verItemPedido(id: number) {
  try {
    const { data } = await supabaseServer
    .from('itenspedido')
    .select('*')
    .eq('id', id)
    if (data) {
      return data[0]
    } 
  } catch(error) {
    console.log(error)
  }
}
