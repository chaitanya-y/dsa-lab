
// Question1: What is this program output
const Foo = function(a) {
  function bar() {
    return a;
  }
  this.baz = function() {
    return a;
  };
};

Foo.prototype = {
  biz() {
    return a;
  },
};

const f = new Foo(7);
console.log(f.bar()); // ? Answer: TypeError
console.log(f.baz()); // ? Answer: 7
console.log(f.biz()); // ? Answer: ReferenceError


// Question2: Fix the program so that it prints a
// const Foo = function(a) {
//   this.a = a;  
//   this.bar = function() {
//     return a;
//   }
//   this.baz = function() {
//     return a;
//   };
// };

// Foo.prototype = {
//   biz() {
//     return this.a;
//   },
// };

// const f = new Foo(7);
// console.log(f.bar()); // ? Answer: 7
// console.log(f.baz()); // ? Answer: 7
// console.log(f.biz()); // ? Answer: 7

// Question3: interviewer asks for cleaner design.
// AnswerL use prototype methods instead of creating functions per object:

// function Foo(a) {
//   this.a = a;
// }

// Foo.prototype.bar = function() {
//   return this.a;
// };

// Foo.prototype.baz = function() {
//   return this.a;
// };

// Foo.prototype.biz = function() {
//   return this.a;
// };

// const f = new Foo(7);

// console.log(f.bar()); // 7
// console.log(f.baz()); // 7
// console.log(f.biz()); // 7


