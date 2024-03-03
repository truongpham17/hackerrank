
var maximumScoreAfterOperations = function (edges, values) {
    const mapValues = []
    mapValues.length = values.length
    mapValues.fill(0)
    const tree = {};

    for ([i, j] of edges) {
        if (!tree[i]) {
            tree[i] = [j]
        } else {
            tree[i].push(j)
        }
        if (!tree[i]) {
            tree[j] = [i]
        } else {
            tree[j].push(i)
        }
    }

    const hasVisited = new Set()
    const queue = { 0: 0 }
    let curQueueLength = 1;
    let curQueueIndex = 0;

    const addQueue = (node) => {
        curQueueLength++;
        queue[curQueueLength - 1] = node
    }

    const popQueue = () => {
        const result = queue[curQueueIndex];
        delete queue[curQueueIndex];
        curQueueIndex++
        return result;
    }

    const isQueueValid = () => {
        return curQueueIndex < curQueueLength
    }

    const getQueueLength = () => {
        return curQueueLength - curQueueIndex;
    }

    const myData = [];

    while (isQueueValid()) {
        const queueLength = getQueueLength();
        for (let i = 0; i < queueLength; i++) {
            const node = popQueue();
            hasVisited.add(node)
            myData.push({ parent: node, node: [], value: - 1 })
            if (Array.isArray(tree[node])) {
                for (child of tree[node]) {
                    if (!hasVisited.has(child)) {
                        myData[myData.length - 1].node.push(child);
                        addQueue(child)

                    }
                }
            }

        }
    }

    const sum = values.reduce((sum, a) => sum + a);
    for (let i = myData.length - 1; i >= 0; i--) {
        const sumChildNode = myData[i].node.length > 0 ? myData[i].node.reduce((sum, index) => sum + values[index], 0) : Number.MAX_SAFE_INTEGER;

        myData[i].value = Math.min(sumChildNode, values[myData[i].parent])
        values[myData[i].parent] = myData[i].value
    }
    return sum - myData[0].value
};