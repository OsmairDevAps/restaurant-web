'use server'

import { supabaseServer } from '../supabase/server';
import { IReserva } from '../../utils/interface';

export async function criaReserva(data: Omit<IReserva, 'id'>) {
  const { data: insertedRow, error } = await supabaseServer.from('reservas').insert({
    datareserva: data.datareserva,
    cliente: data.cliente,
    nummesa: data.nummesa,
    numpessoas: data.numpessoas
  });

  if (error) console.error(error);
  return insertedRow;
}

export async function atualizaReserva(data: IReserva) {
  const { error } = await supabaseServer
    .from('reservas')
    .update({
      datareserva: data.datareserva,
      cliente: data.cliente,
      nummesa: data.nummesa,
      numpessoas: data.numpessoas
      })
    .eq('id', data.id);

  if (error) console.error(error);
}

export async function excluiReserva(id: number) {
  const { error } = await supabaseServer.from('reservas').delete().eq('id', id);
  if (error) console.error(error);
}
