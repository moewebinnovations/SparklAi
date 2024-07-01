import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { userlikedtemplates } from '@/utils/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { email, templateSlug, action } = await req.json();
    if (!email || !templateSlug || !action) {
      throw new Error('Missing required fields');
    }

    if (action === 'like') {
      await db.insert(userlikedtemplates).values({
        email,
        templateslug: templateSlug,
      });
    } else if (action === 'unlike') {
      await db.delete(userlikedtemplates).where(and(
        eq(userlikedtemplates.templateslug, templateSlug),
        eq(userlikedtemplates.email, email)
      ));
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Error liking template:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
