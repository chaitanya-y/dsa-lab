// Live Paragraph
// Create a React component with a text input field and a paragraph below it. As the user types into the input, the paragraph should update immediately to show the same text. The input should be a controlled component whose value is managed through React state.


import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Enter the content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>{value}</p>
    </>
  );
}


//typeScript version
// import { ChangeEvent, useState } from "react";

// function App() {
//   const [value, setValue] = useState<string>("");

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };

//   return (
//     <>
//       <input
//         type="text"
//         placeholder="Enter the content"
//         value={value}
//         onChange={handleChange}
//       />
//       <p>{value}</p>
//     </>
//   );
// }

 export default App;