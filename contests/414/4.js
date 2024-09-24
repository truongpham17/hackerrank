/**
 * @param {number} kx
 * @param {number} ky
 * @param {number[][]} positions
 * @return {number}
 */
var maxMoves = function (kx, ky, positions) {
  // Constants for infinity
  const POSITIVE_INFINITY = Infinity;
  const NEGATIVE_INFINITY = -Infinity;


  // Function to check if all nodes are visited
  function allNodesVisited(state, totalNodes) {
    return state.visitedNodes.size === totalNodes;
  }

  // Function to simulate a move and return a new state
  function makeMove(state, player, node) {
    let newState = {
      A_pos: state.A_pos,
      B_pos: state.B_pos,
      visitedNodes: new Set(state.visitedNodes),
      movesCount: state.movesCount // Track the number of moves
    };

    if (player === 'A') {
      newState.visitedNodes.add(node);
      newState.A_pos = node;
    } else if (player === 'B') {
      newState.visitedNodes.add(node);
      newState.B_pos = node;
    }

    // Increment the move count since a move was made
    newState.movesCount += 1;

    return newState;
  }

  // Helper function to generate a unique key for memoization
  function generateKey(state) {
    return `${state.A_pos}-${state.B_pos}-${Array.from(state.visitedNodes).sort().join(",")}`;
  }

  // Minimax with alpha-beta pruning and memoization to calculate total moves
  function minimax(state, isMaximizingPlayer, alpha, beta, totalNodes, memo) {
    // Generate a unique key for the current state
    const stateKey = generateKey(state);

    // Check if the result for this state is already in the memoization cache
    if (memo.has(stateKey)) {
      return memo.get(stateKey);
    }

    // Base case: if all nodes are visited, return the total number of moves
    if (allNodesVisited(state, totalNodes)) {
      return state.movesCount;
    }

    let result;

    if (isMaximizingPlayer) { // Player A's turn (maximize total moves)
      let maxEval = -Infinity;

      // Explore all possible moves for Player A
      for (let node = 0; node < totalNodes; node++) {
        if (!state.visitedNodes.has(node)) {
          let newState = makeMove(state, 'A', node);
          let eval = minimax(newState, false, alpha, beta, totalNodes, memo);  // Now B's turn
          maxEval = Math.max(maxEval, eval);
          alpha = Math.max(alpha, eval);

          // Alpha-beta pruning
          if (beta <= alpha) {
            break;
          }
        }
      }

      result = maxEval;
    } else { // Player B's turn (minimize total moves)
      let minEval = Infinity;

      // Explore all possible moves for Player B
      for (let node = 0; node < totalNodes; node++) {
        if (!state.visitedNodes.has(node)) {
          let newState = makeMove(state, 'B', node);
          let eval = minimax(newState, true, alpha, beta, totalNodes, memo);  // Now A's turn
          minEval = Math.min(minEval, eval);
          beta = Math.min(beta, eval);

          // Alpha-beta pruning
          if (beta <= alpha) {
            break;
          }
        }
      }

      result = minEval;
    }

    // Store the result in the memoization cache before returning it
    memo.set(stateKey, result);

    return result;
  }

  // Function to start the minimax algorithm for the two-player game
  function solveTwoPlayerGame(totalNodes, startPos) {
    // Memoization cache
    let memo = new Map();

    // Initial state with both players starting at the same position
    let initialState = {
      A_pos: startPos,
      B_pos: startPos,
      visitedNodes: new Set([startPos]),
      movesCount: 0 // Track the total number of moves
    };

    // Call minimax from Player A's perspective (maximize total moves)
    let totalMoves = minimax(initialState, true, -Infinity, Infinity, totalNodes, memo);
    return totalMoves;
  }


  const knightMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  // Function to check if a position is within the bounds of the chessboard
  function isValid(x, y, size) {
    return x >= 0 && x < size && y >= 0 && y < size;
  }


  // BFS function to find the minimum steps for the knight to reach the target
  function minKnightMoves(boardSize, startX, startY, targetX, targetY) {
    // Queue for BFS: each element is [x, y, steps] where steps is the number of moves taken
    let queue = [[startX, startY, 0]];

    // Set to keep track of visited positions
    let visited = new Set();
    visited.add(`${startX},${startY}`);

    // BFS loop
    while (queue.length > 0) {
      let [x, y, steps] = queue.shift();

      // If we reach the target, return the number of steps
      if (x === targetX && y === targetY) {
        return steps;
      }

      // Explore all possible knight moves
      for (let [dx, dy] of knightMoves) {
        let newX = x + dx;
        let newY = y + dy;

        // Check if the new position is valid and not visited yet
        if (isValid(newX, newY, boardSize) && !visited.has(`${newX},${newY}`)) {
          queue.push([newX, newY, steps + 1]);
          visited.add(`${newX},${newY}`);  // Mark position as visited
        }
      }
    }

    // If we somehow don't find a path (shouldn't happen), return -1
    return -1;
  }


  const newArr = [[kx, ky], ...positions]
  const graph = Array.from({ length: newArr.length }, () => Array(newArr.length).fill(0))
  for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      const move = minKnightMoves(50, newArr[i][0], newArr[i][1], newArr[j][0], newArr[j][1],)
      graph[i][j] = move
      graph[j][i] = move
    }
  }
  const result = solveTwoPlayerGame(graph, 0)
  return result
};
console.log(maxMoves(0, 2, [[1, 1], [2, 2], [3, 3]]))