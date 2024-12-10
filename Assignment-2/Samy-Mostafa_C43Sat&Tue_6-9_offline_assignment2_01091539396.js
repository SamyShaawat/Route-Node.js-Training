// Question 1
const divisbleByThree = () => {
    for (let i = 1; i <= 10; i++) {
        if (i % 3 == 0) {
            continue;
        }
        console.log(i);
    }
}
divisbleByThree();
// ----------------------------------------------------------------
// Question 2
const sumFromOneTo100 = () => {
    let total_sum = 0;
    let i = 1;
    while (i <= 100) {
        total_sum = total_sum + i;
        i++;
    }
    return total_sum;
}
console.log(sumFromOneTo100());

// ----------------------------------------------------------------
// Question 3
const iterateOverArray = (array) => {
    array.forEach((element) => {
        console.log(element);
    });
}
let numbers = [1, 2, 3, 4, 5];
iterateOverArray(numbers);

// ----------------------------------------------------------------

// Question 4
// forEach: Loops through arrays with a callback, can access index, but can't break or continue.
// for...of: Loops through anything, no index access,  but can break or continue.

// ----------------------------------------------------------------
// Question 5
let person = { name: 'John', age: 25 };
const extractValuesFromObject = (person) => {
    return `${person.name} is ${person.age} years old`;
}
console.log(extractValuesFromObject(person)); // Output: 'John is 25 years old'

// ----------------------------------------------------------------
// Question 6
const mergeTwoArrays = (array1, array2) => {
    new_array = [...array1, ...array2];
    return new_array;
}

let numbers1 = [1, 2, 3];
let numbers2 = [4, 5, 6];

console.log(mergeTwoArrays(numbers1, numbers2));

// ----------------------------------------------------------------
// Question 7
function sumAllParameters(...parameters) {
    let total = 0;
    for (let i = 0; i < parameters.length; i++) {
        total = total + parameters[i];
    }
    return total;
}
console.log(sumAllParameters(1, 2, 3));
console.log(sumAllParameters(5, 10, 15, 20));

// ----------------------------------------------------------------

// Question 8

// Primitive data types: Immutable values stored directly in the stack: like number, string, and boolean that are immutable 
// Example: let age = 25;

// Non-primitive data types: Mutable objects stored in the heap: like arrays, objects, and functions that can be changed 
// Example: let numbers = [1, 2, 3];

// ----------------------------------------------------------------
// Question 9

// Hoisting: JavaScript put variable and function declarations to the top, so I can use them before they are defined.

// Temporal Dead Zone (TDZ): The TDZ is the time before a variable is declared where I can not use it, trying to do so gives me an Error. 

// ----------------------------------------------------------------
// Question 10
const countNumberOfCalls = () => {
    let x = 0;
    return () => {
        x++;
        return x;
    };
}
let number_Of_calls = countNumberOfCalls()
console.log(number_Of_calls());
console.log(number_Of_calls());
console.log(number_Of_calls());

// ----------------------------------------------------------------
// Question 11
// ask mentor about it 
// ----------------------------------------------------------------
// Question 12
// ask mentor about it 
// ----------------------------------------------------------------
// Question 13
// ask mentor about it 
// ----------------------------------------------------------------
// Question 14
// ask mentor about it 
// ----------------------------------------------------------------
// Question 15
// ask mentor about it 
// ----------------------------------------------------------------
