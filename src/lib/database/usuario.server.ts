// lib/database/user.server.ts
'use server';

import { supabaseServer } from '../supabase/server';
import { IUsuario } from '../../utils/interface';
import { compare, hash } from 'bcrypt';

export async function criaUsuario(data: Omit<IUsuario, 'id'>) {
  const passwordHash = await hash(data.senha, 8);
  const { data: insertedRow, error } = await supabaseServer.from('usuarios').insert({
    nome: data.nome,
    nomeusuario: data.nomeusuario,
    senha: passwordHash,
    tipo: data.tipo,
    foto: data.foto
  });

  if (error) console.error(error);
  return insertedRow;
}

export async function logaUsuario(nomeusuario: string, senha: string) {
  const { data, error } = await supabaseServer
    .from('usuarios')
    .select('*')
    .eq('nomeusuario', nomeusuario)
    .single();

  if (!data) {
    return { usuario: null, message: 'Usuário não encontrado' };
  }

  const senhaCorreta = await compare(senha, data.senha);
  if (!senhaCorreta) {
    return { usuario: null, message: 'Senha incorreta' };
  }

  return { usuario: data, message: '' };
}

export async function atualizaUsuario(data: IUsuario) {
  const { error } = await supabaseServer
    .from('usuarios')
    .update({
      nome: data.nome,
      nomeusuario: data.nomeusuario,
      senha: data.senha,
      tipo: data.tipo,
      foto: data.foto
    })
    .eq('id', data.id);

  if (error) console.error(error);
}

export async function excluiUsuario(id: number) {
  const { error } = await supabaseServer.from('usuarios').delete().eq('id', id);
  if (error) console.error(error);
}
