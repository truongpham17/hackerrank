def max_in_arr(arr):
  return max(arr)

print(max_in_arr([5,3,9,1,7,6]))
print(max_in_arr([4,-1,0,8,-2,3]))

def min_in_arr(arr):
  return min(arr)
print(min_in_arr([5,3,9,1,7,6]))
print(min_in_arr([4,-1,0,8,-2,3]))

def positive_in_arr(arr):
  positive = []
  for num in arr:
    if(num > 0):
      positive.append(num)
  return positive
print(positive_in_arr([5,3,9,1,7,6]))
print(positive_in_arr([4,-1,0,8,-2,3]))