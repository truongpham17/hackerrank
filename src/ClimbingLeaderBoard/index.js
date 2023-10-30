function removeAllDuplicate(arr) {
  const rs = [];
  let cur = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== cur) {
      rs.push(arr[i]);
      cur = arr[i];
    }
  }
  return rs;
}

function climbingLeaderboard(ranked, player) {
  const nonDupRanked = removeAllDuplicate(ranked);
  let curIdx = nonDupRanked.length - 1;
  const rs = [];
  for (let i = 0; i < player.length; i++) {
    for (let j = curIdx; j >= 0; j--) {
      if (j === curIdx && player[i] < nonDupRanked[j]) {
        rs.push(nonDupRanked.length + 1);
        break;
      }

      if (j === 0) {
        rs.push(1);
        break;
      }

      if (player[i] >= nonDupRanked[j] && player[i] < nonDupRanked[j - 1]) {
        rs.push(j + 1);
        break;
      }

      curIdx--;
    }
  }
  return rs;
}

console.log(
  climbingLeaderboard([100, 90, 90, 80, 75, 60], [50, 65, 77, 90, 102])
);
