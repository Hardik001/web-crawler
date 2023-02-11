const { normalizeURL } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL remove protocol', () => {
  const input = 'https:mytest.com/test';
  const actual = normalizeURL(input);
  const expected = 'mytest.com/test';
  expect(actual).toEqual(expected);
});

test('normalizeURL remove trailing slash', () => {
  const input = 'https:mytest.com/test/';
  const actual = normalizeURL(input);
  const expected = 'mytest.com/test';
  expect(actual).toEqual(expected);
});

test('normalizeURL should uncapitalize', () => {
  const input = 'https:MYTest.com/test/';
  const actual = normalizeURL(input);
  const expected = 'mytest.com/test';
  expect(actual).toEqual(expected);
});