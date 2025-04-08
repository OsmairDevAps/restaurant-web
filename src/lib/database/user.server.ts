// lib/database/user.server.ts
'use server';

import { supabaseServer } from '../supabase/server';
import { IUser } from '../../utils/interface';
import { compare, hash } from 'bcrypt';

export async function createUser(data: Omit<IUser, 'id'>) {
  const passwordHash = await hash(data.password, 8);
  const { data: insertedRow, error } = await supabaseServer.from('usuarios').insert({
    name: data.name,
    user: data.user,
    password: passwordHash,
    kind: data.kind
  });

  if (error) console.error(error);
  return insertedRow;
}

export async function loginUser(user: string, password: string) {
  const { data, error } = await supabaseServer
    .from('usuarios')
    .select('*')
    .eq('user', user)
    .single();

  if (!data) {
    return { user: null, message: 'Usuário não encontrado' };
  }

  const senhaCorreta = await compare(password, data.password);
  if (!senhaCorreta) {
    return { user: null, message: 'Senha incorreta' };
  }

  return { user: data, message: '' };
}

export async function updateUser(data: IUser) {
  const { error } = await supabaseServer
    .from('usuarios')
    .update({
      name: data.name,
      user: data.user,
      password: data.password,
      kind: data.kind
    })
    .eq('id', data.id);

  if (error) console.error(error);
}

export async function deleteUser(id: number) {
  const { error } = await supabaseServer.from('usuarios').delete().eq('id', id);
  if (error) console.error(error);
}
