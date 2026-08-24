// 1. Button Toggle

// Create a React component that renders a button. The button should display "OFF" initially, and when the user clicks it, the text should change to "ON". Clicking it again should toggle it back to "OFF". Continue toggling between the two states on every click.import React, { useState } from "react"
import React, { useState } from "react";

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <button type="button" onClick={handleClick}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}



//typescript answer
// import React, { useState } from "react";

// function ToggleButton() {
//   const [isOn, setIsOn] = useState<boolean>(false);

//   const handleClick = (): void => {
//     setIsOn((prev) => !prev);
//   };

//   return (
//     <button type="button" onClick={handleClick}>
//       {isOn ? "ON" : "OFF"}
//     </button>
//   );
// }
export default ToggleButton;
