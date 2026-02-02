import { NextRequest, NextResponse } from 'next/server';
import { WebhookPayload } from '@/lib/aim-os';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!signature) return false;

  const secret = process.env.AIM_OS_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('AIM_OS_WEBHOOK_SECRET not configured');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-aimos-signature');
    const payload = await request.text();

    if (!verifyWebhookSignature(payload, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const body: WebhookPayload = JSON.parse(payload);

    switch (body.type) {
      case 'intake_status_update':
        await handleIntakeStatusUpdate(body);
        break;
      default:
        console.warn('Unknown webhook type:', body.type);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleIntakeStatusUpdate(payload: WebhookPayload): Promise<void> {
  const { intake_id, status } = payload;

  const { error } = await supabase
    .from('intake_submissions')
    .update({ status })
    .eq('id', intake_id);

  if (error) {
    console.error('Failed to update intake status:', error);
    throw error;
  }

  console.log(`Updated intake ${intake_id} to status ${status}`);
}
