import math

def sieve_of_atkin(limit):
    """Generates prime numbers up to 'limit' using the Sieve of Atkin."""
    primes = [False] * (limit + 1)
    
    if limit > 2:
        primes[2] = True
    if limit > 3:
        primes[3] = True

    for x in range(1, int(math.sqrt(limit)) + 1):
        for y in range(1, int(math.sqrt(limit)) + 1):
            n = 4 * x**2 + y**2
            if n <= limit and (n % 12 == 1 or n % 12 == 5):
                primes[n] = not primes[n]

            n = 3 * x**2 + y**2
            if n <= limit and n % 12 == 7:
                primes[n] = not primes[n]

            n = 3 * x**2 - y**2
            if x > y and n <= limit and n % 12 == 11:
                primes[n] = not primes[n]

    for n in range(5, int(math.sqrt(limit)) + 1):
        if primes[n]:
            for k in range(n**2, limit + 1, n**2):
                primes[k] = False

    prime_numbers = [i for i, is_prime in enumerate(primes) if is_prime]
    return prime_numbers

def get_prime_modulus(limit=10000):
    """Finds a large prime number to use as a modulus for hashing."""
    primes = sieve_of_atkin(limit)
    return primes[-1] if primes else 1000000007  # Default fallback prime

class PolynomialRollingHash:
    """Implements a polynomial rolling hash function."""
    def __init__(self, base=31, mod_limit=10000):
        self.base = base
        self.modulus = get_prime_modulus(mod_limit)

    def compute_hash(self, key):
        """Computes the hash value for a given string key."""
        hash_value = 0
        power = 1  # Base^i

        for char in key:
            hash_value = (hash_value + (ord(char) * power) % self.modulus) % self.modulus
            power = (power * self.base) % self.modulus  # Update power for next iteration
        
        return hash_value

# Example Usage
hash_function = PolynomialRollingHash()
keys = ["hello", "world", "hashing", "prime", "function"]

for key in keys:
    print(f"Hash of '{key}': {hash_function.compute_hash(key)}")
