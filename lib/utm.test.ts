import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  hasAnyUtm,
  hasClickId,
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

  test('ignores blank and genuinely unknown params', () => {
    // gclid used to be dropped here, which is exactly why no web booking could
    // be reported back to Google Ads. It is now captured; `fbclid` stands in
    // as the unknown-param case.
    const utms = readUtmsFromSearchParams('utm_source=&fbclid=abc&utm_medium=cpc');
    assert.deepEqual(utms, { utm_medium: 'cpc' });
  });

  test('captures gclid rather than discarding it', () => {
    const utms = readUtmsFromSearchParams('utm_source=&gclid=abc&utm_medium=cpc');
    assert.deepEqual(utms, { utm_medium: 'cpc', gclid: 'abc' });
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
    // The shape is pinned deliberately: it maps 1:1 onto crm_leads columns, so
    // adding a key here without the matching migration fails the insert at
    // runtime rather than at build time. Click ids were added 2026-10-06
    // alongside 20261006120000_crm_leads_click_ids.sql.
    assert.deepEqual(utmsForCrmInsert({ utm_source: 'google' }), {
      utm_source: 'google',
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      gbraid: null,
      wbraid: null,
    });
  });
});

describe('google click ids', () => {
  test('captures gclid from the query string', () => {
    const got = readUtmsFromSearchParams('utm_source=google&utm_medium=cpc&gclid=Cj0KCQabc123');
    assert.equal(got.gclid, 'Cj0KCQabc123');
    assert.equal(got.utm_source, 'google');
  });

  test('captures gbraid and wbraid, which iOS sends INSTEAD of gclid', () => {
    // A paid iOS click can arrive with no gclid at all. Before click ids were
    // captured these journeys were entirely unattributable.
    assert.equal(readUtmsFromSearchParams('gbraid=ios-app-to-web').gbraid, 'ios-app-to-web');
    assert.equal(readUtmsFromSearchParams('wbraid=ios-web-to-app').wbraid, 'ios-web-to-app');
  });

  test('a click id alone counts as attribution worth persisting', () => {
    // Google Ads auto-tagging supplies gclid with no UTMs whatsoever. If
    // hasAnyUtm ignored click ids, that click would never be stored and the
    // booking it produced could never be reported back.
    const clickOnly = { gclid: 'abc' };
    assert.equal(hasAnyUtm(clickOnly), true);
    assert.equal(hasClickId(clickOnly), true);
    assert.equal(hasClickId({ utm_source: 'google' }), false);
  });

  test('click ids survive the cookie round trip', () => {
    const got = readUtmsFromCookieHeader('gclid=Cj0KCQxyz; utm_source=google');
    assert.equal(got.gclid, 'Cj0KCQxyz');
  });

  test('merge keeps the first non-empty click id', () => {
    const merged = mergeUtms({ gclid: '' }, { gclid: 'from-storage' }, { gclid: 'from-cookie' });
    assert.equal(merged.gclid, 'from-storage');
  });

  test('crm insert shape carries the click ids and nulls the rest', () => {
    const row = utmsForCrmInsert({ gclid: 'abc', utm_source: 'google' });
    assert.equal(row.gclid, 'abc');
    assert.equal(row.gbraid, null);
    assert.equal(row.wbraid, null);
    assert.equal(row.utm_source, 'google');
    assert.equal(row.utm_term, null);
  });
});
