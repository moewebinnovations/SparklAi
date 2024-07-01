import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { email } = await req.json(); // Get user email from the request body
    if (!email) {
      throw new Error('Missing email');
    }

    // Delete the subscription record from the database
    const result = await db.delete(UserSubscription).where(eq(UserSubscription.email, email));

    console.log('Deletion result:', result);

    return new NextResponse('Subscription deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting subscription:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
