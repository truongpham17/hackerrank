from random import randint, choice
class RandomizedSet:

    def __init__(self):
        self.list = []
        self.set = dict()

    def insert(self, val: int) -> bool:
        if val in self.set:
            return False
        self.list.append(val)
        self.set[val] = len(self.list) - 1
        return True

    def remove(self, val: int) -> bool:
        if val in self.set:
            print(self.list)
            print(self.set)
            pos = self.set[val]
            self.list[pos] = self.list[-1]
            self.set[self.list[pos]] = pos
            self.list.pop()
            del self.set[val]
            return True
        
        return False

    def getRandom(self) -> int: 
        print (self.list)
        return choice(self.list)
        


# Your RandomizedSet object will be instantiated and called as such:
obj = RandomizedSet()
print(obj.insert(0))
print(obj.insert(1))
# ["RandomizedSet","insert","insert","remove","insert","remove","getRandom"]
# [[],[0],[1],[0],[2],[1],[]]
print(obj.remove(0))
print(obj.insert(2))
print(obj.remove(1))
print(obj.getRandom())
