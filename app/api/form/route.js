// app/api/form/route.js
import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { contactformsubmissions } from '@/utils/schema';

export async function POST(req) {
  try {
    const { firstname, lastname, company, email, phonenumber, message } = await req.json();
    if (!firstname || !lastname || !email || !phonenumber || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await db.insert(contactformsubmissions).values({
      firstname,
      lastname,
      company,
      email,
      phonenumber,
      message,
    });

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Error submitting the form:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
