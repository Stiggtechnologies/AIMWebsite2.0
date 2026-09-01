import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  hasAnyUtm,
  mergeUtms,
  readUtmsFromCookieHeader,
  readUtmsFromSearchParams,
  utmsForCrmInsert,
} from './utm.ts';

describe('UTM capture', () => {
  test('reads the five standard keys from a query string', () => {
    const utms = readUtmsFromSearchParams(
      '?utm_source=google&utm_medium=cpc&utm_campaign=edmonton-physio&utm_content=brand&utm_term=physio'
    );
    assert.deepEqual(utms, {
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'edmonton-physio',
      utm_content: 'brand',
      utm_term: 'physio',
    });
  });

  test('ignores blank and unknown params', () => {
    const utms = readUtmsFromSearchParams('utm_source=&gclid=abc&utm_medium=cpc');
    assert.deepEqual(utms, { utm_medium: 'cpc' });
  });

  test('reads utm_* cookies from a Cookie header', () => {
    const utms = readUtmsFromCookieHeader(
      'aim_session_id=session_1; utm_source=google; utm_medium=cpc; other=1'
    );
    assert.deepEqual(utms, { utm_source: 'google', utm_medium: 'cpc' });
  });

  test('decodes URI-encoded cookie values', () => {
    const utms = readUtmsFromCookieHeader('utm_campaign=edmonton%20physio');
    assert.deepEqual(utms, { utm_campaign: 'edmonton physio' });
  });

  test('body wins over cookies, cookies win over query, per field', () => {
    const merged = mergeUtms(
      { utm_source: 'client-body' },
      { utm_source: 'cookie-source', utm_medium: 'cpc' },
      { utm_source: 'query-source', utm_medium: 'organic', utm_campaign: 'brand' }
    );
    assert.deepEqual(merged, {
      utm_source: 'client-body',
      utm_medium: 'cpc',
      utm_campaign: 'brand',
    });
  });

  test('empty strings do not count as present', () => {
    assert.equal(hasAnyUtm({ utm_source: '  ' }), false);
    const merged = mergeUtms({ utm_source: '  ' }, { utm_source: 'google' });
    assert.equal(merged.utm_source, 'google');
  });

  test('crm insert writes null for missing keys, never undefined', () => {
    assert.deepEqual(utmsForCrmInsert({ utm_source: 'google' }), {
      utm_source: 'google',
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
    });
  });
});
