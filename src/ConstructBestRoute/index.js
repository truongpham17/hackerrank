// source: https://leetcode.com/problems/reconstruct-itinerary/?envType=daily-question&envId=2023-09-14
// Difficulty level: HARD
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const map = new Map();

  tickets.forEach(([from, to]) => {
    if (!map.has(from)) {
      map.set(from, []);
    }
    map.get(from).push(to);
  });

  for (const [key, values] of map.entries()) {
    values.sort((a, b) => (a > b ? -1 : 1));
  }

  const totalTickets = tickets.length + 1;
  const routes = ['JFK'];
  // start from JFK
  function travel(startPoint) {
    if (routes.length === totalTickets) {
      return;
    }
    const allRoutes = map.get(startPoint);
    if (allRoutes === undefined) return;
    const length = allRoutes.length;

    for (let i = length - 1; i >= 0; i--) {
      const nextStartPoint = allRoutes.pop();
      routes.push(nextStartPoint);
      travel(nextStartPoint);

      if (routes.length === totalTickets) {
        return;
      }

      if (i !== 0) {
        allRoutes.push(nextStartPoint);
        [allRoutes[i - 1], allRoutes[allRoutes.length - 1]] = [
          allRoutes[allRoutes.length - 1],
          allRoutes[i - 1],
        ];
      } else {
        allRoutes.unshift(nextStartPoint);
      }
      routes.pop();
    }
  }
  travel(routes[0]);
  return routes;
};

console.log(
  findItinerary([
    ['TIA', 'CBR'],
    ['AXA', 'PER'],
    ['VIE', 'CNS'],
    ['OOL', 'EZE'],
    ['DRW', 'AXA'],
    ['EZE', 'OOL'],
    ['CBR', 'HBA'],
    ['INN', 'VIE'],
    ['PER', 'INN'],
    ['CNS', 'MEL'],
    ['ADL', 'AUA'],
    ['LST', 'ADL'],
    ['TIA', 'MEL'],
    ['OOL', 'ADL'],
    ['CNS', 'OOL'],
    ['OOL', 'PER'],
    ['HBA', 'ANU'],
    ['AUA', 'OOL'],
    ['DRW', 'BNE'],
    ['ANU', 'OOL'],
    ['BAK', 'ADL'],
    ['PER', 'LST'],
    ['PER', 'TIA'],
    ['OOL', 'LST'],
    ['AXA', 'OOL'],
    ['LST', 'AXA'],
    ['DRW', 'EZE'],
    ['OOL', 'BAK'],
    ['BNE', 'OOL'],
    ['AXA', 'SYD'],
    ['CBR', 'DRW'],
    ['CNS', 'PER'],
    ['TIA', 'DRW'],
    ['ANU', 'TIA'],
    ['SYD', 'DRW'],
    ['EZE', 'DRW'],
    ['ADL', 'CNS'],
    ['OOL', 'AUA'],
    ['CNS', 'LST'],
    ['AUA', 'VIE'],
    ['VIE', 'ADL'],
    ['MEL', 'BAK'],
    ['LST', 'BNE'],
    ['OOL', 'EZE'],
    ['AXA', 'TIA'],
    ['AUA', 'LST'],
    ['EZE', 'SYD'],
    ['BAK', 'VIE'],
    ['BNE', 'AXA'],
    ['BAK', 'ANU'],
    ['VIE', 'OOL'],
    ['PER', 'VIE'],
    ['ADL', 'CNS'],
    ['VIE', 'AUA'],
    ['CNS', 'BAK'],
    ['LST', 'PER'],
    ['EZE', 'PER'],
    ['HBA', 'INN'],
    ['VIE', 'AUA'],
    ['JFK', 'BAK'],
    ['MEL', 'HBA'],
    ['PER', 'EZE'],
    ['AUA', 'CNS'],
    ['ADL', 'CNS'],
    ['CBR', 'HBA'],
    ['BNE', 'CBR'],
    ['EZE', 'BNE'],
    ['DRW', 'VIE'],
    ['BAK', 'AXA'],
    ['SYD', 'EZE'],
    ['INN', 'CBR'],
  ])
);
