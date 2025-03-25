import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import ForgotPasswordEmail from '../../../../../emails/ForgotPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, subject, url } = await req.json();

    const result = await resend.emails.send({
      from: `${process.env.RESEND_SENDER_NAME} <${process.env.RESEND_SENDER_EMAIL}>`,
      to: [email],
      subject: subject,
      react: ForgotPasswordEmail({url})
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
