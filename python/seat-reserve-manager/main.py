from  heapq import heapify, heappop, heappush
class SeatManager:
    n = 0
    li = None
    def __init__(self, n: int):
        self.n = n
        self.li = list(range(1, n + 1))
        heapify(self.li)

    def reserve(self) -> int:
        return heappop(self.li)

    def unreserve(self, seatNumber: int) -> None:
        heappush(self.li, seatNumber)


# Your SeatManager object will be instantiated and called as such:
# obj = SeatManager(n)
# param_1 = obj.reserve()
# obj.unreserve(seatNumber)