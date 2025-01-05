// Question 1
function addTwoNumbers(a, b) {
    return a + b;
}
console.log(addTwoNumbers(3, 5));
// ----------------------------------------------------------------
// Question 2
function isPrime(x) {
    if (x <= 1) {
        return false;
    }
    for (let i = 2; i < x; i++) {
        if (x % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrime(101));
// ----------------------------------------------------------------
// Question 3
function reverseString1(string) {
    let reversed_string = string.split('').reverse().join('')
    return reversed_string;
}
console.log(reverseString1("hello"));
// ----------------------------------------------------------------
// Question 4
function findLargestNumber(array) {
    let largest = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] > largest) {
            largest = array[i];
        }
    }
    return largest;
}
numbers = [1, 3, 7, 2, 4]
console.log(findLargestNumber(numbers));
// ----------------------------------------------------------------
// Question 5
function getEvenNumbers(array) {
    let evenNumbers = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 == 0) {
            evenNumbers.push(array[i]);
        }
    }
    return evenNumbers;
}
numbers = [1, 2, 3, 4, 5, 6]
console.log(getEvenNumbers(numbers));
// ----------------------------------------------------------------
// Question 6
function reverseString2(string) {
    let reversed_string = ""
    endOfString = string.length - 1
    for (let i = endOfString; i >= 0; i--) {
        reversed_string = reversed_string + string[i]
    }
    return reversed_string;
}
console.log(reverseString2("hello"));
// ----------------------------------------------------------------
// Question 7
function calculateAverage(array) {
    let total_sum = 0;
    let total_numbers = array.length
    for (let i = 0; i < total_numbers; i++) {
        total_sum = total_sum + array[i];
    }
    let average = total_sum / total_numbers;
    return average;
}
numbers = [1, 2, 3, 4, 5]
console.log(calculateAverage(numbers));
// ----------------------------------------------------------------
// Question 8
function checkDay(day) {
    if (day >= 1 && day <= 5) {
        return "Weekday";
    } else {
        return "Weekend";
    }
}
console.log(checkDay(5));
console.log(checkDay(7));
// ----------------------------------------------------------------
// Question 9
function filterArray(array) {
    let filtered_array = array.filter((number) => {
        return number % 2 === 0 || number % 3 === 0;
    })
    return filtered_array
}
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(filterArray(numbers));
// ----------------------------------------------------------------
// Question 10
function findIndex(array, element) {
    let result = array.indexOf(element);
    return result;
}
console.log(findIndex([1, 2, 3, 4, 5], 3));
console.log(findIndex([1, 2, 3, 4, 5], 10));
// ----------------------------------------------------------------
// Question 11
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result = result * i;
    }

    return result;
}
console.log(factorial(5));
// ----------------------------------------------------------------
// Question 12
function findObjectKeys(object) {
    let result = Object.keys(object);
    return result;
}
let user = { name: "John", age: 30 }
console.log(findObjectKeys(user));
// ----------------------------------------------------------------
// Question 13
function uniqueNumbers(array) {
    let new_array = [];
    for (let number of array) {
        if (array.indexOf(number) === array.lastIndexOf(number)) {
            new_array.push(number);
        }
    }
    return new_array;
}
numbers = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueNumbers(numbers));

// ----------------------------------------------------------------
// Question 14

// ----------------------------------------------------------------
// Question 15
function sortNumbers(array) {
    return array.sort(function (a, b) {
        return a - b;
    });
}
numbers = [5, 3, 8, 1, 2];
console.log(sortNumbers(numbers));
// ----------------------------------------------------------------
// Question 16
function isAnagrams(string1, string2) {

    const sorted_string1 = string1.split('').sort().join('');
    const sorted_string2 = string2.split('').sort().join('');

    return sorted_string1 === sorted_string2;
}
console.log(isAnagrams("listen", "silent"));
// ----------------------------------------------------------------
// Question 17
function removeFalse(array) {
    let result = array.filter(Boolean);
    return result;
}
console.log(removeFalse([0, false, "Hello", "", null, undefined, NaN, 42]));
// ----------------------------------------------------------------
// Question 18
function displayCarDetails(model, year) {
    return {
        model: model,
        year: year,
        printDetails: function () {
            return `Model: ${this.model}, Year: ${this.year}`; // Display the car's details
        }
    };
}
let car = displayCarDetails("Toyota", 2020);
console.log(car.printDetails());
// ----------------------------------------------------------------
// Question 19
function checksProperty(object, property) {
    return property in object;
}
console.log(checksProperty({ name: "Alice", age: 25 }, "name"));
console.log(checksProperty({ name: "Alice", age: 25 }, "address"));
// ----------------------------------------------------------------
// Question 20
function countVowels(string) {
    let count = 0;
    string = string.toLowerCase();

    for (let char of string) {
        if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
            count++;
        }
    }
    return count;
}
console.log(countVowels("Hello World"));
// ----------------------------------------------------------------
// Question 21
function splitString(string) {
    return string.split(" ");
}
console.log(splitString("The quick brown fox"));
// ----------------------------------------------------------------
// Question 22
function calculate(num1, num2, operator) {
    if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    } else if (operator === "*") {
        return num1 * num2;
    } else if (operator === "/") {
        return num1 / num2;
    } else {
        return "Invalid operator";
    }
}
console.log(calculate(5, 3, "+"));
console.log(calculate(5, 3, "%"));

