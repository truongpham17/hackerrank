const CONTANTS = {
  DOG: 'C',
  FOOD: 'F',
  HOME: "H"
}
const problem1 = (input) => {
  let dogPos = -1;
  let homePos = -1;
  const foodPos = [];
  const toPos = (i, j) => i * 4 + j
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (input[i][j] === CONTANTS.DOG) {
        dogPos = toPos(i, j)
      } else if (input[i][j] === CONTANTS.FOOD) {
        foodPos.push(toPos(i, j))
      } else if (input[i][j] === CONTANTS.HOME) {
        homePos = toPos(i, j)
      }
    }
  }

  const collectedFood = new Set();

  const stepFromAToB = (posA, posB) => {
    const jA = posA % 4;
    const iA = (posA - posA % 4) / 4
    const jB = posB % 4;
    const iB = (posB - posB % 4) / 4
    return Math.abs(jB - jA) + Math.abs(iB - iA)
  }
  let minStep = 10 ** 10

  const recursive = (curPos, curStep) => {
    let someFoodNotCollected = false
    for (const food of foodPos) {
      if (!collectedFood.has(food)) {
        someFoodNotCollected = true
        const newStep = curStep + stepFromAToB(curPos, food);
        collectedFood.add(food);
        recursive(food, newStep);
        collectedFood.delete(food);
      }
    }
    if (!someFoodNotCollected) {
      const stepToHome = stepFromAToB(curPos, homePos);
      if (curStep + stepToHome < minStep) {
        minStep = curStep + stepToHome
      }
    }
  }
  recursive(dogPos, 0)
  return minStep;
}

console.log(problem1(["OOOO", "OOFF", "OCHO", "OFOO"]))
/**
 * 0000
 * 00FF
 * 0CHO
 * 0F00
 */