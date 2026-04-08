var num = 10;
var name = "Jane Austen";
var obj1 = { state: "unchanged" };
var obj2 = { state: "unchanged" };
var obj3 = obj2;

function change(num, name, obj1, obj2) {
  num = num * 10;
  name = "Nathaniel Hawthorne";
  obj1 = obj2;
  obj2.state = "changed";
}

change(num, name, obj1, obj2);

console.log("num = " + num);
console.log("name = " + name);
console.log("obj1.state = " + obj1.state);
console.log("obj2.state = " + obj2.state);
console.log("obj3.state = " + obj3.state);



