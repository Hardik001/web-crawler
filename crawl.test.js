const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
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

test('getURLsFromHTML absolute URLs', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://mytest.com/">
        MyTest
      </a>
    </body>
  </html>`;

  const inputBaseURL = "https:mytest.com"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://mytest.com/"];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative URLs', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        MyTest
      </a>
    </body>
  </html>`;

  const inputBaseURL = "https://mytest.com"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://mytest.com/path/"];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative URLs', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://mytest.com/path1/">
        Absolute
      </a>
      <a href="/path2/">
        Relative
      </a>
    </body>
  </html>`;

  const inputBaseURL = "https://mytest.com"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://mytest.com/path1/","https://mytest.com/path2/"];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid URLs', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        Absolute
      </a>
    </body>
  </html>`;

  const inputBaseURL = "https://mytest.com"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});