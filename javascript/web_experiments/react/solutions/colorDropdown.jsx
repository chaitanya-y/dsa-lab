// Create a React component that renders a dropdown with the options Red, Blue, and Green. When the user selects a color, display a message below the dropdown showing the selected color in the format: "You have selected: [color]". The selected option should stay in sync with the displayed value.

import React, { useState } from "react";

function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState("Red");

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div>
      <select value={selectedColor} onChange={handleChange}>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
      </select>

      <p>You have selected: {selectedColor}</p>
    </div>
  );
}

//Typescript version
// import React, { useState, ChangeEvent } from "react";

// function ColorSelector() {
//   const [selectedColor, setSelectedColor] = useState<string>("Red");

//   const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     setSelectedColor(event.target.value);
//   };

//   return (
//     <div>
//       <select value={selectedColor} onChange={handleChange}>
//         <option value="Red">Red</option>
//         <option value="Blue">Blue</option>
//         <option value="Green">Green</option>
//       </select>

//       <p>You have selected: {selectedColor}</p>
//     </div>
//   );
// }

// export default ColorSelector;

export default ColorSelector;