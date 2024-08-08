// https://leetcode.com/problems/robot-collisions/description/?envType=daily-question&envId=2024-07-13
// HARD

/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function (positions, healths, directions) {
  const rPos = []
  const result = []
  const combine = positions.map((v, i) => ({ pos: v, order: i, health: healths[i], direction: directions[i] }))
  combine.sort((a, b) => a.pos - b.pos)
  const n = combine.length;
  for (let i = 0; i < n; i++) {
    const robot = combine[i]
    if (robot.direction === 'R') {
      rPos.push(robot)
    } else {
      while (rPos.length > 0 && robot.health > 0) {
        const rRobot = rPos.pop();
        if (rRobot.health > robot.health) {
          rRobot.health -= 1
          robot.health = 0
          rPos.push(rRobot)
        } else if (rRobot.health < robot.health) {
          robot.health -= 1
        } else {
          robot.health = 0
          rRobot.health = 0
        }
      }
      if (robot.health > 0) {
        result.push(robot)
      }
    }
  }
  result.push(...rPos)
  result.sort((a, b) => a.order - b.order)
  return result.map(i => i.health)
};
console.log(survivedRobotsHealths([5, 4, 3, 2, 1], [2, 17, 9, 15, 10], "RRRRR"))