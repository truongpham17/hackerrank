
var ProductOfNumbers = function () {
  this.arr = [];
  this.zeroIndex = -1;
  this.product = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
  if (num === 0) {
    this.arr = []
    this.product = []
  } else {
    this.arr.push(num);
    const last = this.product[this.product.length - 1] || 1
    this.product.push(last * num)
  }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  if (this.arr.length < k) return 0
  const n = this.arr.length;
  return this.product[n - 1] / (this.product[n - k - 1] || 1)
};

const productOfNumbers = new ProductOfNumbers();
console.log(productOfNumbers.add(3))        // [3]
console.log(productOfNumbers.add(0))        // [3,0]
console.log(productOfNumbers.add(2))        // [3,0,2]
console.log(productOfNumbers.add(5))        // [3,0,2,5]
console.log(productOfNumbers.add(4))        // [3,0,2,5,4]
console.log(productOfNumbers.getProduct(2)) // return 20. The product of the last 2 numbers is 5 * 4 = 20
console.log(productOfNumbers.getProduct(3)) // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
console.log(productOfNumbers.getProduct(4)) // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
console.log(productOfNumbers.add(8))        // [3,0,2,5,4,8]
console.log(productOfNumbers.getProduct(2)) // return 32. The product of the last 2 numbers is 4 * 8 = 32 