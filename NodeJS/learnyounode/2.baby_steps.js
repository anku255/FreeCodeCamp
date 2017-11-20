// 2. BABY STEPS
// Print the sum of numbers supplied in
// Command Line Arguments

var numbers = process.argv.slice(2);
numbers = numbers.map(x => Number(x));
let sum = numbers.reduce(function (sum, value) {
    return sum + value;
}, 0);
console.log(sum);