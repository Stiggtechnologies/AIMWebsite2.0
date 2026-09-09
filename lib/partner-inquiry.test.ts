import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { blockPHIInPayload } from './phi-validator.ts';
import {
  buildPartnerInquiryNote,
  funnelTypeForPartner,
  leadSourceSlugForPartner,
  notificationTitleForPartner,
  partnerInquirySchema,
} from './partner-inquiry.ts';

const validInquiry = {
  category: 'employer' as const,
  first_name: 'Alex',
  last_name: 'Morgan',
  organization: 'Example Manufacturing',
  role: 'Safety manager',
  email: 'alex@example.com',
  phone: '780-555-0142',
  interest: 'return-to-work',
  service_region: 'alberta-remote',
  expected_volume: '6-20-month',
  preferred_contact: 'email' as const,
  message: 'We want to discuss an organization-level program.',
  consent_given: true as const,
  page_path: '/for-employers',
};

describe('partner inquiry validation', () => {
  test('accepts an organization-level inquiry with business contact information', () => {
    const result = partnerInquirySchema.safeParse(validInquiry);
    assert.equal(result.success, true);
    assert.equal(blockPHIInPayload(validInquiry).isValid, true);
  });

  test('requires consent and a valid work email', () => {
    const result = partnerInquirySchema.safeParse({
      ...validInquiry,
      email: 'not-an-email',
      consent_given: false,
    });
    assert.equal(result.success, false);
  });

  test('blocks patient or claim information in the free-text field', () => {
    const result = blockPHIInPayload({
      ...validInquiry,
      message: 'Patient diagnosis and claim number are attached.',
    });
    assert.equal(result.isValid, false);
  });
});

describe('partner inquiry AIM OS classification', () => {
  test('uses distinct partner funnels without creating another CRM', () => {
    assert.equal(funnelTypeForPartner('employer'), 'partner_employer');
    assert.equal(funnelTypeForPartner('healthcare'), 'partner_healthcare');
    assert.equal(funnelTypeForPartner('legal'), 'partner_legal');
  });

  test('preserves paid-source attribution and defaults healthcare to physician referral', () => {
    assert.equal(leadSourceSlugForPartner('legal', 'facebook'), 'facebook-ads');
    assert.equal(leadSourceSlugForPartner('employer', 'linkedin'), 'linkedin');
    assert.equal(leadSourceSlugForPartner('healthcare'), 'physician-referral');
    assert.equal(leadSourceSlugForPartner('legal'), 'website-organic');
  });

  test('builds a legible reference and notification without clinical detail', () => {
    const note = buildPartnerInquiryNote(validInquiry, 'PARTNER-ABC12345');
    assert.match(note, /Example Manufacturing/);
    assert.match(note, /PARTNER-ABC12345/);
    assert.equal(notificationTitleForPartner('employer'), 'New employer program inquiry');
  });
});
