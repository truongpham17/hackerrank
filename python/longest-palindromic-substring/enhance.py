# Python solution for Longest Palindromic Substring (Brute Force)

# A function to print a substring.
def printSubstring(str, left, right):
    for i in range(left, right + 1):
        print(str[i], end="")

# A function to get the longest palindromic substring in a
# given string using Brute Force Approach.
def longestPalSubstring(str):

    # Getting length of the input string
    n = len(str)

    # All substrings of length 1 are palindromes
    maxLength = 1
    start = 0

    # Checking all the substrings
    for i in range(n):
        for j in range(i, n):
            flag = 1

            # Checking for a palindromic subtring
            for k in range(0, ((j - i) // 2) + 1):
                if str[i + k] != str[j - k]:
                    flag = 0

            # If substring is palindromic
            if flag != 0 and (j - i + 1) > maxLength:
                start = i
                maxLength = j - i + 1

    # Printing the longest Palindromic substring
    print("The Longest Palindromic Substring is: ", end="")
    printSubstring(str, start, start + maxLength - 1)


# Driver Code
if __name__ == '__main__':
    my_string = "daabddfddbegtd"
    longestPalSubstring(my_string)