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




// 1. Button Toggle

// Create a React component that renders a button. The button should display "OFF" initially, and when the user clicks it, the text should change to "ON". Clicking it again should toggle it back to "OFF". Continue toggling between the two states on every click.

// 2. Color Dropdown

// Create a React component that renders a dropdown with the options Red, Blue, and Green. When the user selects a color, display a message below the dropdown showing the selected color in the format: "You have selected: [color]". The selected option should stay in sync with the displayed value.

// 3. Context API Language Toggle

// Create a React app that uses the Context API to manage a user’s favorite programming language. Display the current language on the page, and provide a button that toggles the value between JavaScript and Python. The child component should consume the context and update the displayed language when the button is clicked.

// 4. Letter Tiles

// Create a React app that displays buttons for the letters A to Z. When a letter is clicked, append it to an output string shown on the screen. If the same letter is clicked multiple times, apply custom logic to track how many times it has been selected and update the output accordingly. The app should maintain both the clicked-letter history and the count of repeated clicks per letter.

// 5. Render a List

// Create a React component that renders a list of people from an array of objects. Each object contains a name and age. Display the data as a list in the UI, with one row for each person showing both values. Use .map() to generate the list items dynamically.

// 6. Live Paragraph

// Create a React component with a text input field and a paragraph below it. As the user types into the input, the paragraph should update immediately to show the same text. The input should be a controlled component whose value is managed through React state.

// 7. Phone Book

// Create a React phone book application with a form that collects first name, last name, and phone number. When the form is submitted, add the new user to a table displayed below the form. After each submission, sort all entries alphabetically by last name before rendering them. Clear the form after submission.

// 8. Quiz Builder

// Create a React quiz app that shows one multiple-choice question at a time. Each question should have several answer options displayed as radio buttons. When the user submits an answer, show whether it was correct or incorrect, move to the next question, and keep track of the score. At the end of the quiz, display the final score out of the total number of questions.

// 9. React Native Simple Counter

// Create a simple counter app in React Native. Display the current count on the screen and provide a button labeled Increase. Each time the button is pressed, increment the count by 1 and update the displayed value.

// 10. Simple Counter

// Create a React component that displays a count starting at 0 and a button labeled Increase. Each click of the button should increment the count by 1 and update the number shown on the page.

// 11. Tic-Tac-Toe

// Create a React Tic-Tac-Toe game with a 3x3 board. Two players should take turns placing X and O in empty squares. Once a square is filled, it should not be clickable again. Detect when a player wins by completing a row, column, or diagonal, and display the winner on the screen. Also provide a Reset button to restart the game.

// 12. TypeScript Button Toggle

// Create a React component in TypeScript that renders a button showing either ON or OFF. The button should start in one state and toggle to the other whenever it is clicked. Use TypeScript types for state and event-handling logic.

// 13. Weather Dashboard

// Create a React weather dashboard that allows the user to search for a city by name. When the user clicks Search, display the city’s weather details including temperature, humidity, and wind speed using mock data. If the city is not found, show a City not found message. Store previously searched cities and render them as clickable buttons so the user can quickly load earlier search results again. Also avoid refetching data for cities that have already been searched by caching the results.