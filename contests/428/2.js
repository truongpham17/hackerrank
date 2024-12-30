/**
 * @param {string} initialCurrency
 * @param {string[][]} pairs1
 * @param {number[]} rates1
 * @param {string[][]} pairs2
 * @param {number[]} rates2
 * @return {number}
 */
var maxAmount = function (initialCurrency, pairs1, rates1, pairs2, rates2) {
  const graph1 = buildGraph(pairs1, rates1)
  const graph2 = buildGraph(pairs2, rates2)

  let max = 0;
  for (const key of Object.keys(graph1)) {
    const d1 = 1 / dijkstra(graph1, initialCurrency, key)
    const d2 = 1 / dijkstra(graph2, key, initialCurrency)
    if(d1>0 && d2> 0) {
      max = Math.max(max, d1 * d2)
    }
  }
  return max
};

function buildGraph(pairs, rates) {
  const graph = {}
  for (let i = 0; i < rates.length; i++) {
    const [a, b] = pairs[i]
    if (!graph[a]) {
      graph[a] = {}
    }
    if (!graph[b]) {
      graph[b] = {}
    }
    graph[a][b] = 1 / rates[i]
    graph[b][a] = rates[i]
  }
  return graph;
}

function dijkstra(graph, start, end) {
  const distances = {};
  const priorityQueue = [];

  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 1;
  priorityQueue.push([start, 1]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[1] - b[1]);
    const [currentNode, currentDistance] = priorityQueue.shift();

    if (currentNode === end) {
      return distances[end];
    }

    for (const neighbor in graph[currentNode]) {
      const weight = graph[currentNode][neighbor];
      const totalDistance = currentDistance * weight;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        priorityQueue.push([neighbor, totalDistance]);
      }
    }
  }

  return distances[end] === Infinity ? -1 : distances[end];
}

console.log(maxAmount(
  "USD",
  [["USD", "EUR"]],
  [1.0],
  [["EUR", "JPY"]],
  [10.0]
))