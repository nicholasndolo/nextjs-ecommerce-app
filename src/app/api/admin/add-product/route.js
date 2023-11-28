
import { connectToDB } from '@/database';

export const dynamic = "force-dynamic";

export async function POST(req){
  try {
    await connectToDB()
  } catch (err) {}
}
