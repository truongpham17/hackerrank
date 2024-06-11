// https://leetcode.com/problems/longest-palindrome/?envType=daily-question&envId=2024-06-10
// EASY
/**
 * @param {string} s
 * @return {number}
 * 0 1 2 3 
 */
var longestPalindrome = function (s) {
  const map = new Map();
  for (c of s) {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1)
    } else {
      map.set(c, 1)
    }
  }
  let foundOdd = false
  let result = 0;
  for (const value of map.values()) {
    if (value % 2 === 0) {
      result += value;
    } else {
      result += value - 1;
      foundOdd = true
    }
  }

  if (foundOdd) {
    result += 1
  }
  return result
};
console.log(longestPalindrome("civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"))