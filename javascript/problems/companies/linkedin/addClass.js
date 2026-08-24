// Implement addClass framework-style utility function in plain JavaScript.

function addClass(className, elementOrId) {
  const element =
    typeof elementOrId === 'string'
      ? document.getElementById(elementOrId)
      : elementOrId;

  if (!element || !(element instanceof Element)) {
    return null;
  }

  if (typeof className !== 'string' || className.trim() === '') {
    return element.className;
  }

  const classesToAdd = className.trim().split(/\s+/);
  element.classList.add(...classesToAdd);

  return element.className;
}

console.log(addClass("favourite","favourite"))
//run this program with html,js files setup