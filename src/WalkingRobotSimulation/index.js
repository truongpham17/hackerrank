/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  const hMap = new Map();
  const vMap = new Map();
  for (const [u, v] of obstacles) {
    if (hMap.has(u)) {
      hMap.get(u).push(v)
    } else {
      hMap.set(u, [v])
    }

    if (vMap.has(v)) {
      vMap.get(v).push(u)
    } else {
      vMap.set(v, [u])
    }
  }



  for (const v of hMap.values()) {
    v.sort((a, b) => a - b)
  }
  for (const h of vMap.values()) {
    h.sort((a, b) => a - b)
  }


  const findMinInRange = (arr, min, max) => {
    let l = 0;
    let r = arr.length - 1

    let rs = -1

    while (l <= r) {
      const mid = (l + r) >> 1
      if (arr[mid] >= min) {
        rs = mid
        r = mid - 1
      } else {
        l = mid + 1
      }
    }

    if (rs !== -1 && arr[rs] <= max) {
      return rs
    }
    return -1
  }

  const findMaxInRange = (arr, min, max) => {
    let l = 0;
    let r = arr.length - 1
    let rs = -1
    while (l <= r) {
      const mid = (l + r) >> 1
      if (arr[mid] <= max) {
        rs = mid
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
    if (rs !== -1 && arr[rs] >= min) {
      return rs
    }
    return -1
  }

  const coord = [0, 0]
  let direction = 0
  let rs = 0

  for (const command of commands) {
    const [x, y] = coord

    if (command === -1) {
      // right
      direction = (direction + 4 + 1) % 4
      continue
    } else if (command === -2) {
      // left 
      direction = (direction + 4 - 1) % 4
      continue
    }


    switch (direction) {
      // right
      case 0: {
        const h = hMap.get(x)
        const obstacle = findMinInRange(h || [], y + 1, y + command)
        if (obstacle !== -1) {
          coord[1] = h[obstacle] - 1
        } else {
          coord[1] = y + command
        }
        break
      }

      case 1: {
        const v = vMap.get(y)
        const obstacle = findMinInRange(v || [], x + 1, x + command)
        if (obstacle !== -1) {
          coord[0] = v[obstacle] - 1
        } else {
          coord[0] = x + command
        }
        break
      }

      case 2: {
        const h = hMap.get(x)
        const obstacle = findMaxInRange(h || [], y - command, y - 1)
        if (obstacle !== -1) {
          coord[1] = h[obstacle] + 1
        } else {
          coord[1] = y - command
        }
        break
      }

      case 3: {
        const v = vMap.get(y)
        const obstacle = findMaxInRange(v || [], x - command, x - 1)
        if (obstacle !== -1) {
          coord[0] = v[obstacle] + 1
        } else {
          coord[0] = x - command
        }
      }
    }

    rs = Math.max(rs, coord[0] ** 2 + coord[1] ** 2)

  }
  return rs
};

console.log(robotSim([-2, -1, -2, 3, 7],
  [[1, -3], [2, -3], [4, 0], [-2, 5], [-5, 2], [0, 0], [4, -4], [-2, -5], [-1, -2], [0, 2]]))