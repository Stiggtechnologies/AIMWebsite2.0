import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { describe, it } from 'node:test';
import { verifyAimosWebhookSignature } from './aimos-webhook.ts';

describe('AIM OS webhook signatures', () => {
  const payload = JSON.stringify({ type: 'lead_created', lead_id: 'lead-123' });
  const secret = 'test-secret';

  it('accepts the matching HMAC signature', () => {
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    assert.equal(verifyAimosWebhookSignature(payload, signature, secret), true);
  });

  it('rejects missing, malformed, and incorrect signatures without throwing', () => {
    assert.equal(verifyAimosWebhookSignature(payload, null, secret), false);
    assert.equal(verifyAimosWebhookSignature(payload, 'bad', secret), false);
    assert.equal(verifyAimosWebhookSignature(payload, '0'.repeat(64), secret), false);
    assert.equal(verifyAimosWebhookSignature(payload, '0'.repeat(64), undefined), false);
  });
});
