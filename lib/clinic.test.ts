import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_LOCATION } from './config.ts';
import {
  AIM_EDM_001_CLINIC_ID,
  clinicIdForLocation,
  getDefaultClinicId,
} from './clinic.ts';

describe('clinic_id for website bookings', () => {
  const previous = process.env.AIM_DEFAULT_CLINIC_ID;

  beforeEach(() => {
    delete process.env.AIM_DEFAULT_CLINIC_ID;
  });

  afterEach(() => {
    if (previous === undefined) delete process.env.AIM_DEFAULT_CLINIC_ID;
    else process.env.AIM_DEFAULT_CLINIC_ID = previous;
  });

  test('edmonton-main-hub maps to AIM-EDM-001', () => {
    assert.equal(clinicIdForLocation('edmonton-main-hub'), AIM_EDM_001_CLINIC_ID);
  });

  test('DEFAULT_LOCATION.slug maps to AIM-EDM-001', () => {
    assert.equal(clinicIdForLocation(DEFAULT_LOCATION.slug), AIM_EDM_001_CLINIC_ID);
  });

  test('a missing location still gets AIM-EDM-001, never null', () => {
    assert.equal(clinicIdForLocation(undefined), AIM_EDM_001_CLINIC_ID);
    assert.equal(clinicIdForLocation(''), AIM_EDM_001_CLINIC_ID);
    assert.equal(clinicIdForLocation('   '), AIM_EDM_001_CLINIC_ID);
  });

  test('an unknown slug still defaults to AIM-EDM-001 (only live clinic)', () => {
    assert.equal(clinicIdForLocation('south-common'), AIM_EDM_001_CLINIC_ID);
    assert.equal(clinicIdForLocation('not-a-clinic'), AIM_EDM_001_CLINIC_ID);
  });

  test('AIM_DEFAULT_CLINIC_ID overrides the documented fallback', () => {
    process.env.AIM_DEFAULT_CLINIC_ID = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
    assert.equal(getDefaultClinicId(), 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    assert.equal(clinicIdForLocation('edmonton-main-hub'), 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
  });

  test('blank AIM_DEFAULT_CLINIC_ID falls back to the prod UUID', () => {
    process.env.AIM_DEFAULT_CLINIC_ID = '   ';
    assert.equal(getDefaultClinicId(), AIM_EDM_001_CLINIC_ID);
  });
});
