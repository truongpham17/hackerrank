const getNondupChars = (s) => {
  return [...new Set(s.split(''))];
};

const sortCharIndex = (s) => {
  const array = s
    .split('')
    .map((c, i) => ({
      value: c,
      index: i,
    }))
    .sort((a, b) => a.value.localeCompare(b.value));
  return array;
};

const groupChar = (arr) => {
  const result = [];
  arr.forEach((item) => {
    if (item.value !== result[result.length - 1]?.value) {
      result.push({
        value: item.value,
        indexes: [item.index],
      });
    } else {
      result[result.length - 1].indexes.push(item.index);
    }
  });
  return result;
};

const main = (s) => {
  const nonDupChars = getNondupChars(s);
  const data = groupChar(sortCharIndex(s));

  const rs = [];

  const findNextNode = (lastWeight) => {
    if (rs.length === nonDupChars.length) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      if (!node.isColored) {
        for (let j = 0; j < node.indexes.length; j++) {
          const curWeight = node.indexes[j];
          if (curWeight > lastWeight) {
            node.isColored = true;
            rs.push(node.value);
            findNextNode(curWeight);
            if (rs.length === nonDupChars.length) {
              return;
            }
            rs.pop();
            break;
          }
        }
        if (node.isColored) {
          node.isColored = false;
        } else {
          break;
        }
      }
    }
  };

  findNextNode(-1);
  return rs.join('');
};

main(
  'pblspykdpqfhcfcirkrhbbfbnqagshfqrrkcjpsuaytjfwyhjpubttxkkpswuvoiicsnkxiyhsyqrqecsiabhvjfodpkdgcgdceobyfonnurqxvstxkgsagnosvfjgsnylyhbjcrkgaylgxxxmghfbpfqwpplntrrogtkapbpkkwkdxgrfmikdlcftuyywrsnfasxgiw'
);
