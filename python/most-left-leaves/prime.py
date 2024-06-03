
def get_primes():
    n=int(input("Nhập số tự nhiên n:"))
    def is_prime(num):
      if num <= 1:
          return False
      for i in range(2, num):
          if num % i == 0:
              return False
      return True

    for num in range(2, n + 1):
        if is_prime(num):
            print(num, end=" ")
get_primes()