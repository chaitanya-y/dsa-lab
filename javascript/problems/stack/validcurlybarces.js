/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const characterMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (!characterMap[char]) {
            console.log(char)
            // It's an opening character, push it to the stack
            stack.push(char);
        } else {
            // It's a closing character
            const topElement = stack.pop();
            if (topElement !== characterMap[char]) {
                return false; // Mismatched opening and closing braces
            }
        }
    }

    // If the stack is empty, all braces were matched
    return stack.length === 0;
};


console.log(isValid("({[]})"))