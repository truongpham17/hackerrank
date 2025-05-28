import math

def sieve(limit):
    if limit < 2:
        return []
      
    res = [False] * (limit + 1)
    
    if limit >= 2:
        res[2] = True
    if limit >= 3:
        res[3] = True

    sqrt_limit = int(math.sqrt(limit)) + 1

    i = 1
    while i < sqrt_limit:
        j = 1
        while j < sqrt_limit:
            n = (4 * i * i) + (j * j)
            if n <= limit and (n % 12 == 1 or n % 12 == 5):
                res[n] ^= True

            n = (3 * i * i) + (j * j)
            if n <= limit and n % 12 == 7:
                res[n] ^= True

            n = (3 * i * i) - (j * j)
            if i > j and n > 0 and n <= limit and n % 12 == 11:
                res[n] ^= True
            j += 1
        i += 1

    r = 5
    while r * r <= limit:
        if res[r]:
            for k in range(r * r, limit + 1, r * r):
                res[k] = False
        r += 1

    prime_numbers = [i for i, is_prime in enumerate(res) if is_prime]
    return prime_numbers

def pick_prime(primes, min_size=1000):
    """returns a suitable prime to use as modulus"""
    if not primes:
      raise ValueError("The prime list is empty.") 
    for prime in primes:
        if prime >= min_size:
            return prime
    # if no prime large enough exists, use last one on list
    return primes[-1]

def my_hash(string, modulus):
    """implements polynomial rolling of string keys"""
    hash_value = 5381
    for char in string:
        # hash = (hash * 33) XOR ord(c)
        hash_value = (hash_value * 33) ^ ord(char)
    return hash_value % modulus

if __name__ == '__main__':
    # generate primes list to use as modulus
    primes = sieve(10000) # modify limit based on your needs

    modulus = pick_prime(primes, 1000)

    test_array = ["alpha","beta","gamma","delta","epsilon"]

    for string in test_array:
        hash_value = my_hash(string, modulus)
        print(f"Hash of {string} is {hash_value}")