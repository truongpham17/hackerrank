const findItinerary = require('.');

test('sample 1', () => {
  expect(
    findItinerary([
      ['MUC', 'LHR'],
      ['JFK', 'MUC'],
      ['SFO', 'SJC'],
      ['LHR', 'SFO'],
    ])
  ).toBe(['JFK', 'MUC', 'LHR', 'SFO', 'SJC']);
});
