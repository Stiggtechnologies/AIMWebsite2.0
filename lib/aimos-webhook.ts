import crypto from 'crypto';

export function verifyAimosWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string | undefined,
): boolean {
  if (!signature || !secret) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (!/^[a-f0-9]{64}$/i.test(signature) || signature.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
