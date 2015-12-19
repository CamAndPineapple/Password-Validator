// QUESTION 1:

// FOR LOOP
function addWithForLoop(numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
   return sum; 
}

addWithForLoop([1, 2, 3, 4]);


// WHILE LOOP
function addWithWhileLoop(numbers) {
  var sum = 0;
  // counter
  var i = 0;

  // ** Accidentally had i <= numbers.length which doesn't work 
  // because length = 4 and at index of 4 there is no number **
  while (i < numbers.length) {      
    sum += numbers[i];
    i++;
  }
  return sum;
}

addWithWhileLoop([1, 2, 3, 4]);

// RECURSION
function addWithRecursion(numbers) {
  // If empty array, return 0 **forgot to add 0 after return**
  if (numbers.length === 0) {
    return 0;
  } else {
    // Take first number of array and recursively add 
    return numbers.shift() + addWithRecursion(numbers);
  }
}
addWithRecursion([1, 2, 3, 4]);



// QUESTION 2:

function combineLists(list1, list2) {
  // Create a new array by mapping over the values of list1
  // and iterating over the values of list2 using the index parameter provided
  var listsCombined = list1.map(function(value, index) {
    // return a 2-dimensional array that combines values of list1 with values of list2
    return [value, list2[index]];
  });
  // Transform 2D array to a 1D array by concatenated the arrays
  var flattenArray = [].concat.apply([], listsCombined);
  return flattenArray;
}

// QUESTION 3:

function calcFibonacci(howMany) {

  var firstFib = 0;
  var secondFib = 1;
  var sequence = secondFib;
  var fullSequence = [];

  // Push the first two numbers in the sequence into an array
  fullSequence.push(firstFib, secondFib);

  for (var i = 2; i < howMany; i++) {
    sequence = firstFib + secondFib;
    firstFib = secondFib;
    secondFib = sequence;

    fullSequence.push(secondFib);
  }

  return fullSequence;
}

calcFibonacci(100);

// QUESTION 4:

function formLargestNumber(numbers) {
  // Interesting Fact: This works because when you use sort on an
  // an array of numbers, it converts the numbers to strings before
  // it sorts them. It sorts based on their Unicode Values.
  // The unicode value for 9 is greater than 50, 
  // which is why it sorts in the correct order
  return Number(numbers.sort().reverse().join(''));

}

formLargestNumber([50, 2, 1, 9]);
