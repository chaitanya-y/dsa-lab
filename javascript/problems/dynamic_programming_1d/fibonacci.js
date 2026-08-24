// function generateFibonacci(n) {
//     const series = [0, 1]; // Start with the first two terms

//     // Loop to generate the next terms
//     for (let i = 2; i < n; i++) {
//         const nextTerm = series[i - 1] + series[i - 2]; // Sum of the two preceding numbers
//         series.push(nextTerm); // Add the new term to the array
//     }

//     return series;
// }

// // Example usage: generate the first 10 Fibonacci numbers
// const fibSeries = generateFibonacci(10);
// console.log(fibSeries.join(', '));
// Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34




function fibonacci(n) {
    // Base case: return n if it's 0 or 1
    if (n <= 1) {
        return n;
    }
    // Recursive case: sum of the two preceding numbers
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function generateFibonacciSeriesRecursive(n) {
    const series = [];
    for (let i = 0; i < n; i++) {
        series.push(fibonacci(i));
    }
    return series;
}

// Example usage: generate the first 10 Fibonacci numbers
const fibSeriesRecursive = generateFibonacciSeriesRecursive(10);
console.log(fibSeriesRecursive.join(', '));
// Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
