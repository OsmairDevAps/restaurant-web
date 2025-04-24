// app/api/users/route.ts
import { supabaseServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabaseServer
    .from('view_produtos_com_categorias')
    .select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
