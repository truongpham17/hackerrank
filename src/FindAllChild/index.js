/**
 * node: {
    id: number;
    parentId: number;
  }

 given id, find all sub-childs of that node, most time and memory
 
  map = {
    parentId: [childId] -> O(n!)
  }
  sort all nodes by parentId -> no memory, O(nlogn)
  , binary search (logn)
  parentId 
  with each parentId: find all nodes that have parentId = parentId
  sorted array, find startIndex and endIndex arr[startIndex] = arr[endIndex] = parentId

  advance BS
  arr[i] < parentId
  arr[i+1] = parentId -> left pointer = i+1 O(logn)

  arr[j] = parentId
  arr[j+1] > parentId -> pointer = j
  [i+1, j] -> O(logn) -> O(logn!)
  logn * 1 + logn * 1 + logn * 1 * logn ...
  sum (ki) = n -> max multi(k) => ki = 1
  max = (logn)^n => O(nlogn)


  node {
    id: number, 
    parentId,
    childIndexes: [] -> O(n^2)
  }

  a + b = k
  max a*b -> a = b 



  1. filter null parentId
  2. sort array on parentId
  3. recursive:
   - with each id, find startIndex, and endIndex using BS (return step 3)
   O(nlogn)
 */

function findStartAndEndIndex(arr, k) {
  let start = 0;
  let end = arr.length - 1;
  let startIndex = -1;
  let endIndex = -1;

  // Binary search for start index
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] < k) {
      start = mid + 1;
    } else if (arr[mid] === k) {
      startIndex = mid;
      end = mid - 1;
    } else {
      end = mid - 1;
    }
  }

  // Reset start and end pointers
  start = 0;
  end = arr.length - 1;

  // Binary search for end index
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === k) {
      endIndex = mid;
      start = mid + 1;
    } else if (arr[mid] < k) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return [startIndex, endIndex];
}


const findAllChild = (data) => {
  const result = []
  data = data.filter(i => i.parentId !== null && i.parentId !== undefined).sort((a, b) => a.parentId - b.parentId)
  
}