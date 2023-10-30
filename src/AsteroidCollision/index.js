const main = (rs) => {
  let prev = null;
  let first = null;
  rs.forEach((v, i) => {
    const newObj = {
      value: v,
      next: null,
      prev,
    };
    if (prev) {
      prev.next = newObj;
      prev = newObj;
    } else {
      first = newObj;
      prev = newObj;
    }
  });

  const findConflict = (ref) => {
    let pivot = saveCurConflict || first;
    while (pivot?.next) {
      if (pivot.value > 0 && pivot.value * pivot.next?.value < 0) {
        return pivot;
      }
      pivot = pivot.next;
    }
    return false;
  };

  let saveCurConflict = null;
  while (true) {
    const conflict = findConflict(saveCurConflict);
    if (conflict) {
      let prev = null;
      let next = null;
      if (conflict.value > -conflict.next.value) {
        prev = conflict;
        next = conflict.next?.next;
      } else if (conflict.value < -conflict.next.value) {
        prev = conflict.prev;
        next = conflict.next;
      } else {
        prev = conflict.prev;
        next = conflict.next?.next;
      }
      if (prev) {
        prev.next = next;
        saveCurConflict = prev;
      } else {
        first = next;
        saveCurConflict = next;
      }
      if (next) {
        next.prev = prev;
      }
    } else {
      break;
    }
  }

  const result = [];

  let ref = first;
  while (true) {
    if (ref) {
      result.push(ref.value);
      ref = ref.next;
    } else {
      return result;
    }
  }
};

console.log(main([9, -8]));
