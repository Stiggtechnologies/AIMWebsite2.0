import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { blockPHIInPayload, validateNoPHI } from './phi-validator.ts';

/**
 * These tests exist because online booking was broken for months and nobody
 * could see it. Two independent faults, either one sufficient on its own:
 *
 *   1. public_leads did not exist in the database the site writes to, so every
 *      submission returned 500.
 *   2. This validator rejected the contact field for containing contact details,
 *      so every submission returned 400 even once the table existed.
 *
 * Fixing one would not have revealed the other. The point of these tests is that
 * a booking either works or the suite goes red — not that the code "looks right".
 */

/** The smallest payload /api/booking/confirm actually accepts. */
function bookingPayload(contactValue: string, extra: Record<string, unknown> = {}) {
  return {
    handoff_type: 'booking',
    persona: 'patient',
    contact_method: 'phone',
    contact_value: contactValue,
    booking_mode: 'PATIENT_SELF_BOOK',
    ...extra,
  };
}

describe('a patient can actually book', () => {
  test('a phone number in contact_value is accepted', () => {
    const r = blockPHIInPayload(bookingPayload('780-555-0142'));
    assert.equal(r.isValid, true, `rejected a phone booking: ${r.violations.join('; ')}`);
  });

  test('an email in contact_value is accepted', () => {
    const r = blockPHIInPayload({
      ...bookingPayload('someone@example.com'),
      contact_method: 'email',
    });
    assert.equal(r.isValid, true, `rejected an email booking: ${r.violations.join('; ')}`);
  });

  test('every phone format a real person might type is accepted', () => {
    for (const v of ['7805550142', '780-555-0142', '780.555.0142', '780 555 0142', '(780) 555-0142']) {
      const r = blockPHIInPayload(bookingPayload(v));
      assert.equal(r.isValid, true, `rejected ${v}: ${r.violations.join('; ')}`);
    }
  });

  test('Google Ads UTM fields are not treated as PHI', () => {
    const r = blockPHIInPayload(bookingPayload('780-555-0142', {
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'edmonton-physio',
      utm_content: 'brand',
      utm_term: 'physiotherapy edmonton',
    }));
    assert.equal(r.isValid, true, `rejected a paid booking: ${r.violations.join('; ')}`);
  });
});

describe('the guard still guards', () => {
  test('a SIN in the contact field is still blocked', () => {
    // The exemption is per-pattern, not a blanket pass for the field.
    const r = blockPHIInPayload(bookingPayload('123 456 789'));
    assert.equal(r.isValid, false, 'a SIN slipped through the contact field');
  });

  test('clinical detail in free text is still blocked', () => {
    const r = blockPHIInPayload(bookingPayload('780-555-0142', {
      notes: 'my diagnosis is a torn ACL and my medication list is attached',
    }));
    assert.equal(r.isValid, false, 'clinical detail slipped through notes');
  });

  test('a blocked field name is still rejected', () => {
    const r = blockPHIInPayload(bookingPayload('780-555-0142', { date_of_birth: '1985-05-17' }));
    assert.equal(r.isValid, false, 'date_of_birth was accepted');
  });

  test('a phone number in a NON-contact field is still blocked', () => {
    const r = blockPHIInPayload(bookingPayload('780-555-0142', { notes: 'call my wife on 780-555-9999' }));
    assert.equal(r.isValid, false, 'the exemption leaked to an unrelated field');
  });
});

describe('detection is deterministic', () => {
  /**
   * The patterns were declared with /g and tested with RegExp.test(), which
   * advances lastIndex and returns false on the next call against the same
   * regex object. Because the patterns are module-level singletons shared by
   * every request, the guard gave different answers for identical input
   * depending on call order — so it could silently miss a real SIN. A guard
   * that is only sometimes armed is worse than none, because it is trusted.
   */
  test('the same input gives the same verdict every time', () => {
    const sin = { notes: 'my sin is 123 456 789' };
    const verdicts = Array.from({ length: 10 }, () => validateNoPHI(sin).isValid);
    assert.deepEqual(
      Array.from(new Set(verdicts)), [false],
      `verdict flipped across repeated calls: ${JSON.stringify(verdicts)}`
    );
  });

  test('a clean payload stays clean across repeated calls', () => {
    const p = bookingPayload('780-555-0142');
    const verdicts = Array.from({ length: 10 }, () => blockPHIInPayload(p).isValid);
    assert.deepEqual(Array.from(new Set(verdicts)), [true], 'a valid booking was intermittently rejected');
  });
});
