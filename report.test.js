const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages', () => {
  const input = {
    'https:mytest.com/test': 1,
    'https:mytest.com/': 3
  };
  const actual = sortPages(input);
  const expected = [
    ['https:mytest.com/', 3],
    ['https:mytest.com/test', 1]
  ];
  expect(actual).toEqual(expected);
});