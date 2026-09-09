import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  clinicMailboxRecipients,
  clinicSmtpConfig,
  DEFAULT_CLINIC_NOTIFICATION_ADDRESS,
} from './clinic-email.ts';

describe('clinic mailbox SMTP configuration', () => {
  it('uses the local forwarding mailbox by default', () => {
    assert.equal(DEFAULT_CLINIC_NOTIFICATION_ADDRESS, 'websiteleads@aimphysiotherapy.ca');
    assert.deepEqual(clinicMailboxRecipients(DEFAULT_CLINIC_NOTIFICATION_ADDRESS), [
      'websiteleads@aimphysiotherapy.ca',
    ]);
  });

  it('builds a secure MochaHost SMTP configuration', () => {
    assert.deepEqual(clinicSmtpConfig({ CLINIC_SMTP_PASSWORD: 'secret' }), {
      host: 'mail.aimphysiotherapy.ca',
      port: 465,
      secure: true,
      user: 'websiteleads@aimphysiotherapy.ca',
      password: 'secret',
    });
  });

  it('refuses to send without the mailbox password', () => {
    assert.throws(
      () => clinicSmtpConfig({}),
      /CLINIC_SMTP_PASSWORD is not configured/,
    );
  });
});
