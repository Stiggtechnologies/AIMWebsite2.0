import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  contactFunnelType,
  contactLeadSchema,
  contactLeadSourceSlug,
} from './contact-lead.ts';
import { clinicMailboxRecipients, DEFAULT_CLINIC_MAILBOX } from './clinic-lead-notifications.ts';

describe('website contact lead routing', () => {
  it('requires contact consent and accepts a clean routing-only message', () => {
    const result = contactLeadSchema.safeParse({
      full_name: 'Alex Morgan',
      email: 'alex@example.com',
      phone: '780-555-0100',
      interest: 'patient',
      message: 'Please call me about an appointment.',
      consent_given: true,
      page_path: '/contact',
    });

    assert.equal(result.success, true);
  });

  it('keeps paid attribution and uses the correct partner funnels', () => {
    assert.equal(contactLeadSourceSlug('patient', 'meta'), 'facebook-ads');
    assert.equal(contactLeadSourceSlug('referral'), 'physician-referral');
    assert.equal(contactFunnelType('employer'), 'partner_employer');
    assert.equal(contactFunnelType('legal'), 'partner_legal');
  });

  it('defaults every clinic lead email to the approved clinic mailbox', () => {
    assert.equal(DEFAULT_CLINIC_MAILBOX, 'aim2recover@albertainjurymanagement.ca');
    assert.deepEqual(clinicMailboxRecipients(DEFAULT_CLINIC_MAILBOX), [
      'aim2recover@albertainjurymanagement.ca',
    ]);
  });
});
